import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Boxes from "../components/boxes";
import "../styles/VoterSheet.css";
import * as XLSX from "xlsx";

interface VoterData {
  cms: string;
  name: string;
  dept: string;
  status: string;
}

function VoterSheet() {
  const [tableData, setTableData] = useState<VoterData[]>([]);
  const [uploadedData, setUploadedData] = useState<VoterData[]>([]);
  const [fileName, setFileName] = useState<string>("Choose file");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      window.alert("Please upload an Excel file.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const formattedData: VoterData[] = jsonData
        .slice(1)
        .map((row: any) => ({
          cms: row[0] ? String(row[0]) : "",
          name: row[1] ? String(row[1]) : "",
          dept: row[2] ? String(row[2]) : "",
          status: "Unvoted",
        }))
        .filter((student) => student.cms && student.name && student.dept);

      setUploadedData(formattedData);
      setUploadProgress(100);

      const studentsCollection = collection(db, "students");
      const querySnapshot = await getDocs(studentsCollection);
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);

      const contestantsCollection = collection(db, "contestants");
      const contestantsSnapshot = await getDocs(contestantsCollection);
      const resetVotesPromises = contestantsSnapshot.docs.map((doc) =>
        updateDoc(doc.ref, { votes: "0" })
      );
      await Promise.all(resetVotesPromises);

      setUploadProgress(50);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleLoadData = async () => {
    if (uploadedData.length === 0) {
      window.alert("No data to upload. Please select a valid Excel sheet.");
      return;
    }

    try {
      setUploadProgress(25);
      const studentsCollection = collection(db, "students");
      const uploadPromises = uploadedData.map((student) =>
        addDoc(studentsCollection, student)
      );

      await Promise.all(uploadPromises);
      window.alert("All students uploaded successfully!");

      setTableData((prevData) => [...prevData, ...uploadedData]);
      setUploadedData([]);
      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading data:", error);
      window.alert("Error uploading students. Please try again.");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDept(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const data = querySnapshot.docs.map((doc) => doc.data() as VoterData);
        setTableData(data);

        const uniqueDepartments = [
          ...new Set(data.map((student) => student.dept)),
        ];
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData =
    selectedDept === ""
      ? tableData
      : tableData.filter((student) => student.dept === selectedDept);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Navbar msg="Upload Voters" />
      <div
        style={{
          display: "flex",
          height: "100%",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <Sidebar />
        <div className="vmain-content">
          <div className="Vbox">
            <Boxes />
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="mn">
              <div className="mainCo">
                <label className="LabelLogoo">Upload Voter Sheet</label>

                <div className="custom-file-input">
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="fileInput" className="file-label">
                    {fileName}
                  </label>
                </div>

                <div
                  className="drag-drop-area"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <i className="fas fa-file-upload icon"></i>
                  <p>Drag and drop the file here</p>
                  <p>or click to Choose file</p>
                </div>

                {uploadProgress > 0 && (
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="tableee">
                {/* <p className="Est">Eligible Students</p> */}
                {/* Filter */}
                <div className="filter-container">
                  <select
                    id="departmentFilter"
                    value={selectedDept}
                    onChange={handleFilterChange}
                    style={{ marginLeft: "0px" }}
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="table-Co"
                  // style={{ border: '2px solid black' }}
                >
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Cms</th>
                        <th>Name</th>
                        <th>Dept</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.cms}</td>
                          <td>{row.name}</td>
                          <td>{row.dept}</td>
                          <td>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "fixed",
              marginLeft: "44.3rem",
              marginTop: "-8.8rem",
            }}
          >
            <button
              className="load"
              onClick={handleLoadData}
              style={{
                background: "rgba(0, 208, 194, 0.9)",
                cursor: "pointer",
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterSheet;
