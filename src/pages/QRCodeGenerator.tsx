import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "../styles/ProfileQrBox.css";

const QrGenerator: React.FC = () => {
  const [cmsId, setCmsId] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]); // For CMS ID suggestions
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [officerDepartment, setOfficerDepartment] = useState<string | null>(
    null
  );
  const [isStudentFound, setIsStudentFound] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [, setStartTime] = useState<Date | null>(null);
  const [, setEndTime] = useState<Date | null>(null);
  const [canGenerateQR, setCanGenerateQR] = useState<boolean>(false);

  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchOfficerDepartment = () => {
      const department = localStorage.getItem("officerDepartment");
      if (department) {
        setOfficerDepartment(department);
      } else {
        setError("Officer department not found");
      }
    };

    const fetchVotingTimes = async () => {
      try {
        const db = getFirestore();
        const timingRef = collection(db, "votingTiming");
        const timingSnapshot = await getDocs(timingRef);

        if (!timingSnapshot.empty) {
          const timingData = timingSnapshot.docs[0].data();

          const start =
            timingData.startDate && timingData.startDate.toDate
              ? timingData.startDate.toDate()
              : null;
          const end =
            timingData.endDate && timingData.endDate.toDate
              ? timingData.endDate.toDate()
              : null;

          if (start && end) {
            setStartTime(start);
            setEndTime(end);

            const now = new Date();
            setCanGenerateQR(now >= start && now <= end);
          } else {
            setError("Voting times are not set properly in the database.");
          }
        }
      } catch (error) {
        console.error("Error fetching voting times:", error);
        setError("Error fetching voting timing");
      }
    };

    fetchOfficerDepartment();
    fetchVotingTimes();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (input: string) => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const db = getFirestore();
      const studentsRef = collection(db, "students");
      const q = query(
        studentsRef,
        where("cms", ">=", input),
        where("cms", "<=", input + "\uf8ff"), // Matches strings that start with `input`
        orderBy("cms"),
        limit(5) // Limit to 5 suggestions
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const fetchedSuggestions = querySnapshot.docs.map(
          (doc) => doc.data().cms
        );
        setSuggestions(fetchedSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching CMS suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCmsId(value);
    setStudentData(null);
    setError(null);
    setIsStudentFound(false);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCmsId(suggestion);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    // ... existing handleSearch code
    const cmsIdRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (!cmsIdRegex.test(cmsId)) {
      setError("Please use xxx-xx-xxxx format.");
      setShowPopup(true);
      return;
    }

    setError(null);
    const db = getFirestore();

    if (!officerDepartment) {
      setError("Officer department not available.");
      setShowPopup(true);
      return;
    }

    try {
      const studentsRef = collection(db, "students");
      const q = query(studentsRef, where("cms", "==", cmsId));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const student = querySnapshot.docs[0].data();

        if (student.dept && student.dept.trim() === officerDepartment.trim()) {
          setStudentData(student);
          setIsStudentFound(true);
          setQrCode(null);
          setShowPopup(false);
        } else {
          setError("Student not found in your department");
          setStudentData(null);
          setIsStudentFound(false);
          setShowPopup(true);
        }
      } else {
        setError("Student not found");
        setStudentData(null);
        setIsStudentFound(false);
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Error fetching student data");
      setIsStudentFound(false);
      setShowPopup(true);
    }
  };

  const handleGenerate = () => {
    // ... existing handleGenerate code
    if (cmsId.trim() && canGenerateQR) {
      setQrCode(cmsId);
      setShowPopup(true);
    } else {
      setError("QR code generation is not allowed outside the voting period.");
      setShowPopup(true);
    }
  };

  const handleDownload = () => {
    // ... existing handleDownload code
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qr-code.png";
      link.click();
    }
  };

  const handlePrint = () => {
    // ... existing handlePrint code
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current;
      const image = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank")!;

      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              @media print {
                body * {
                  visibility: hidden;
                }
                .qr-code {
                  visibility: visible;
                  display: block;
                  margin: 0 auto;
                }
              }
            </style>
          </head>
          <body>
            <img src="${image}" class="qr-code" alt="QR Code" />
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "0px", display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // border: "2px solid black",
          marginRight: "3.5rem",
        }}
      >
        <h1>QR Code </h1>
        <input
          type="text"
          placeholder="Enter CMS ID"
          value={cmsId}
          onChange={handleInputChange}
          style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              marginTop: "-25px",
              background: "white",
              // border: "1px solid #ccc",
              width: "295px",
              maxHeight: "100px",
              // position: "absolute",
              marginLeft: "0rem",
              overflowY: "auto",

              zIndex: 1000,
              margin: "0 auto",
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <br />
        <button
          onClick={handleSearch}
          style={{
            padding: "6px 8px",
            // marginBottom: "20px",
            backgroundColor: "rgba(0, 208, 194, 0.9)",
            marginLeft: "370px",
            border: "none",
            position: "fixed",
            color: "white",
            cursor: "pointer",
            marginTop: "85px",
            width: "3.8rem",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        >
          Search
        </button>
      </div>
      {/* Rest of your JSX */}

      <div
        className="qpage-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {studentData && (
          <div className="qprofile-box">
            <div className="qprofile-header">
              <div className="qprofile-pic"></div>
              <p className="qprofile-name">{studentData.name}</p>
            </div>
            <div className="qprofile-info">
              <div className="qprofile-info-row">
                <strong>ID:</strong>
                <span>{studentData.cms}</span>
              </div>
              <div className="qprofile-info-row">
                <strong>Dept:</strong>
                <span>{studentData.dept}</span>
              </div>
              <div className="qprofile-info-row">
                <strong>Status:</strong>
                <span>{studentData.status}</span>
              </div>
            </div>
          </div>
        )}

        {isStudentFound && (
          <button
            onClick={handleGenerate}
            disabled={!canGenerateQR}
            style={{
              padding: "10px 20px",
              marginBottom: "20px",
              marginLeft: "0px",
              marginTop: "10px",
              border: "none",
              backgroundColor: canGenerateQR
                ? "rgba(0, 208, 194, 0.9)"
                : "grey",
              color: "white",
              fontSize: "1rem",
              cursor: canGenerateQR ? "pointer" : "not-allowed",
              borderRadius: "5px",
              width: "310px",
            }}
          >
            Generate
          </button>
        )}
      </div>

      {showPopup && (
        <div className="qr-popup">
          <div className="qr-popup-content">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            {error ? (
              <p
                style={{
                  color: "red",
                  paddingRight: "35px",
                  fontFamily: "fantasy",
                }}
              >
                {error}
              </p>
            ) : (
              qrCode && (
                <div
                  style={{
                    margin: "30px 10px",
                    // border: "2px solid blue",
                  }}
                >
                  <QRCodeCanvas value={qrCode} size={256} ref={qrCodeRef} />
                  <div
                    style={{
                      display: "flex",
                      marginTop: "5px",
                    }}
                  >
                    <button
                      onClick={handleDownload}
                      style={{
                        padding: "10px 25px",
                        marginTop: "10px",
                        backgroundColor: "rgba(0, 208, 194, 0.9)",
                        border: "none",

                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        marginBottom: "10px",
                      }}
                    >
                      Download
                    </button>
                    <button
                      onClick={handlePrint}
                      style={{
                        padding: "10px 40px",
                        backgroundColor: "rgba(0, 208, 194, 0.9)",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        fontSize: "1rem",
                      }}
                    >
                      Print
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QrGenerator;
