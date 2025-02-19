import React, { useEffect, useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Boxes from "../components/boxes";

import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore"; // Firestore imports
import { db } from "../firebase"; // Your Firestore config
import "../styles/home.css"; // Your CSS styles

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define the type for a contestant
interface Contestant {
  id: string;
  name: string;
  department: string;
  votes: number;
  contact: string;
  cmsId: string;
  email: string;
  gender: string;
  logo: string;
}

// Define the type for a presiding officer
interface PresidingOfficer {
  id: string;
  name: string;
  department: string;
}

//here %
interface PresidingOfficer {
  id: string;
  name: string;
  department: string;
}

// Define the Popup component to show contestant details
// Inside Popup component
const Popup: React.FC<{
  contestant: Contestant | null;
  onClose: () => void;
}> = ({ contestant, onClose }) => {
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [updatedContestant, setUpdatedContestant] = useState<Contestant | null>(
    contestant
  );

  if (!contestant) return null;

  const handleUpdateClick = () => {
    setIsUpdatePopupOpen(true);
  };

  const handleRemoveClick = async () => {
    if (contestant) {
      try {
        await deleteDoc(doc(db, "contestants", contestant.id));
        onClose(); // Close the popup after deletion
        alert("Contestant removed successfully.");
      } catch (error) {
        console.error("Error removing contestant:", error);
        alert("Failed to remove contestant.");
      }
    }
  };

  const handleUpdateSubmit = async () => {
    if (updatedContestant) {
      try {
        const contestantRef = doc(db, "contestants", updatedContestant.id);
        await updateDoc(contestantRef, {
          name: updatedContestant.name,
          department: updatedContestant.department,
          contact: updatedContestant.contact,
          cmsId: updatedContestant.cmsId,
          email: updatedContestant.email,
          gender: updatedContestant.gender,
        });
        setIsUpdatePopupOpen(false); // Close update popup after submission
        onClose(); // Close the main popup
        alert("Contestant updated successfully.");
      } catch (error) {
        console.error("Error updating contestant:", error);
        alert("Failed to update contestant.");
      }
    }
  };

  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          {/* Profile Card */}
          <div className="vcard-container">
            <div className="vtop-section">
              <div className="vprofile-circle"></div>
              <div className="vname">{contestant.name}</div>
              <img src={contestant.logo} alt="Logo" className="vlogo" />
            </div>
            <p
              style={{
                marginTop: "-4px",
                marginLeft: "440px",
                fontWeight: "bold",
              }}
            >
              Logo
            </p>
            <div className="vinfo-container">
              <div className="vrow">
                <span className="vlabel">Contact:</span>
                <span>{contestant.contact}</span>
              </div>
              <div className="vrow">
                <span className="vlabel">CMS ID:</span>
                <span>{contestant.cmsId}</span>
              </div>
              <div className="vrow">
                <span className="vlabel">Email:</span>
                <span>{contestant.email}</span>
              </div>
              <div className="vrow">
                <span className="vlabel">Department:</span>
                <span>{contestant.department}</span>
              </div>
              <div className="vrow">
                <span className="vlabel">Gender:</span>
                <span>{contestant.gender}</span>
              </div>
            </div>
            {/* Update and Remove Buttons */}
            <div className="popup-buttons">
              <button
                className="update-button"
                onClick={handleUpdateClick}
                style={{ borderRadius: "4px", marginRight: "8px" }}
              >
                Update
              </button>
              <button
                className="remove-button"
                onClick={handleRemoveClick}
                style={{ borderRadius: "4px" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Popup */}
      {isUpdatePopupOpen && updatedContestant && (
        <div
          className="popup-overlay"
          onClick={() => setIsUpdatePopupOpen(false)}
          style={{}}
        >
          <div
            className="anotherpopup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "white", marginLeft: "7rem" }}>
              Update Contestant
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={updatedContestant.name}
              onChange={(e) =>
                setUpdatedContestant({
                  ...updatedContestant,
                  name: e.target.value,
                })
              }
              style={{
                width: "325px",
                marginLeft: "40px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
                borderBottom: "1px solid white",
              }}
            />
            <input
              type="text"
              placeholder="Department"
              value={updatedContestant.department}
              onChange={(e) =>
                setUpdatedContestant({
                  ...updatedContestant,
                  department: e.target.value,
                })
              }
              style={{
                width: "325px",
                marginLeft: "40px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
                borderBottom: "1px solid white",
              }}
            />
            <input
              type="text"
              placeholder="Contact"
              value={updatedContestant.contact}
              onChange={(e) =>
                setUpdatedContestant({
                  ...updatedContestant,
                  contact: e.target.value,
                })
              }
              style={{
                width: "325px",
                marginLeft: "40px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
                borderBottom: "1px solid white",
              }}
            />
            <input
              type="text"
              placeholder="CMS ID"
              value={updatedContestant.cmsId}
              onChange={(e) =>
                setUpdatedContestant({
                  ...updatedContestant,
                  cmsId: e.target.value,
                })
              }
              style={{
                width: "325px",
                marginLeft: "40px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
                borderBottom: "1px solid white",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={updatedContestant.email}
              onChange={(e) =>
                setUpdatedContestant({
                  ...updatedContestant,
                  email: e.target.value,
                })
              }
              style={{
                width: "325px",
                marginLeft: "40px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
                borderBottom: "1px solid white",
              }}
            />

            <input
              type="text"
              placeholder="Gender"
              value={updatedContestant.gender}
              onChange={(e) =>
                setUpdatedContestant({
                  ...updatedContestant,
                  gender: e.target.value,
                })
              }
              style={{
                width: "325px",
                marginLeft: "40px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
                borderBottom: "1px solid white",
              }}
            />
            <button
              onClick={handleUpdateSubmit}
              style={{
                marginLeft: "40px",
                marginTop: "10px",
                marginRight: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setIsUpdatePopupOpen(false)}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function Home() {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [presidingOfficers, setPresidingOfficers] = useState<
    PresidingOfficer[]
  >([]);
  const [votedPercentage, setVotedPercentage] = useState(0);
  const [unvotedPercentage, setUnvotedPercentage] = useState(0);
  const [selectedContestant, setSelectedContestant] =
    useState<Contestant | null>(null);

  // here %
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [currentOfficer, setCurrentOfficer] = useState<PresidingOfficer | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch contestants from Firestore
  useEffect(() => {
    const fetchContestants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contestants"));
        const contestantsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const logoUrl = data.logo || "";
          return {
            id: doc.id,
            name: data.name,
            department: data.department,
            votes: data.votes,
            contact: data.contact,
            cmsId: data.cmsId,
            email: data.email,
            gender: data.gender,
            logo: logoUrl,
          } as Contestant;
        });
        setContestants(contestantsData);
      } catch (error) {
        console.error("Error fetching contestants:", error);
      }
    };

    const fetchPresidingOfficers = async () => {
      try {
        const officersQuery = query(
          collection(db, "users"),
          where("role", "==", "presiding_officer")
        );
        const officersSnapshot = await getDocs(officersQuery);
        const officersData = officersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            department: data.department,
          } as PresidingOfficer;
        });
        setPresidingOfficers(officersData);
      } catch (error) {
        console.error("Error fetching presiding officers:", error);
      }
    };

    const calculateVotingPercentage = async () => {
      try {
        const studentsSnapshot = await getDocs(collection(db, "students"));
        const totalStudents = studentsSnapshot.size;
        let votedCount = 0;
        studentsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === "voted") votedCount++;
        });
        const votedPercent = (votedCount / totalStudents) * 100;
        setVotedPercentage(votedPercent);
        setUnvotedPercentage(100 - votedPercent);
      } catch (error) {
        console.error("Error calculating voting percentages:", error);
      }
    };

    fetchContestants();
    fetchPresidingOfficers();
    calculateVotingPercentage();
  }, []);

  const handleProfileClick = (contestant: Contestant) => {
    setSelectedContestant(contestant);
  };

  const handleClosePopup = () => {
    setSelectedContestant(null);
  };

  //here
  useEffect(() => {
    fetchPresidingOfficers();
  }, []);

  const fetchPresidingOfficers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const officersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PresidingOfficer[];
    setPresidingOfficers(officersData);
  };

  const handleDropdownToggle = (officerId: string) => {
    setDropdownVisible((prev) => (prev === officerId ? null : officerId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (officerId: string) => {
    await deleteDoc(doc(db, "users", officerId));
    setPresidingOfficers((prev) =>
      prev.filter((officer) => officer.id !== officerId)
    );
    setDropdownVisible(null); // Close dropdown after action
  };

  const openUpdatePopup = (officer: PresidingOfficer) => {
    setCurrentOfficer(officer);
    setIsUpdatePopupOpen(true);
    setDropdownVisible(null);
  };

  const handleUpdateSubmit = async () => {
    if (currentOfficer) {
      const officerRef = doc(db, "users", currentOfficer.id);
      await updateDoc(officerRef, {
        name: currentOfficer.name,
        department: currentOfficer.department,
      });
      fetchPresidingOfficers(); // Refresh the list
      setIsUpdatePopupOpen(false); // Close the update popup
    }
  };

  // Here is the new one

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Navbar msg="Dashboard" />
        <div
          style={{
            display: "flex",
            height: "100%",
            marginTop: "32px",
            width: "100%",
          }}
        >
          <Sidebar />

          <div className="main-content">
            <div className="hbx">
              <Boxes />
            </div>
            <div className="cc">
              <div
                style={{ display: "flex", gap: "0.89rem", marginLeft: "26px" }}
              >
                <div className="circles">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "4px" }}>
                      <div className="circle-container">
                        <div
                          className="circle"
                          style={
                            {
                              "--percentage": votedPercentage,
                            } as React.CSSProperties
                          }
                        >
                          <p
                            className="voted"
                            style={{
                              marginTop: "-35px",
                              marginLeft: "-140px",
                              color: "rgba(0, 208, 194, 0.9)",
                            }}
                          >
                            Voted%
                          </p>
                          <p className="votedNum">
                            {votedPercentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="circle-container">
                        <div
                          className="circle"
                          style={
                            {
                              "--percentage": unvotedPercentage,
                            } as React.CSSProperties
                          }
                        >
                          <p
                            className="voted"
                            style={{
                              marginTop: "-35px",
                              marginLeft: "-127px",
                              color: "rgba(0, 208, 194, 0.9)",
                            }}
                          >
                            Unvoted%
                          </p>
                          <p className="votedNum">
                            {unvotedPercentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="c_table-container"
                      style={{ maxHeight: "160px" }}
                    >
                      {/* <div> */}
                      <table
                        className="c_user-table"
                        style={{ width: "24rem" }}
                      >
                        <thead>
                          <tr>
                            <th>Presiding Officers</th>
                            <th>Department</th>
                          </tr>
                        </thead>
                        <tbody>
                          {presidingOfficers.map((officer) => (
                            <tr key={officer.id}>
                              <td
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  className="three-dot-icon"
                                  onClick={() =>
                                    handleDropdownToggle(officer.id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </span>
                                {officer.name}

                                {/* Dropdown Menu */}
                                {dropdownVisible === officer.id && (
                                  <div
                                    ref={dropdownRef}
                                    className="dropdown-menu"
                                  >
                                    <button
                                      onClick={() => openUpdatePopup(officer)}
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() => handleDelete(officer.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </td>
                              <td>{officer.department}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Update Popup */}
                      {isUpdatePopupOpen && currentOfficer && (
                        <div
                          className="popup-overlay"
                          onClick={() => setIsUpdatePopupOpen(false)}
                        >
                          <div
                            className="popup-content"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h3 style={{ marginLeft: "6rem", color: "white" }}>
                              Update Officer
                            </h3>
                            <input
                              type="text"
                              placeholder="Name"
                              value={currentOfficer.name}
                              onChange={(e) =>
                                setCurrentOfficer({
                                  ...currentOfficer,
                                  name: e.target.value,
                                })
                              }
                              style={{
                                width: "325px",
                                marginLeft: "10px",
                                borderRadius: "0px",
                                backgroundColor: "transparent",
                                color: "white",
                                border: "none",
                                outline: "none",
                                borderBottom: "1px solid white",
                                paddingBottom: "0px",
                                marginTop: "0px",
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Department"
                              value={currentOfficer.department}
                              onChange={(e) =>
                                setCurrentOfficer({
                                  ...currentOfficer,
                                  department: e.target.value,
                                })
                              }
                              style={{
                                width: "325px",
                                marginLeft: "10px",
                                borderRadius: "0px",
                                backgroundColor: "transparent",
                                color: "white",
                                border: "none",
                                outline: "none",
                                borderBottom: "1px solid white",
                                paddingBottom: "0px",
                                marginTop: "0px",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                marginLeft: "0.4rem",
                                marginTop: "0px",
                              }}
                            >
                              <button
                                onClick={handleUpdateSubmit}
                                style={{
                                  borderRadius: "2px",
                                  backgroundColor: "rgba(0, 208, 194, 0.9)",
                                  border: "0.2px solid gray",
                                  marginRight: "0px",
                                }}
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => setIsUpdatePopupOpen(false)}
                                style={{
                                  marginLeft: "2px",
                                  borderRadius: "2px",

                                  backgroundColor: "rgba(0, 208, 194, 0.9)",
                                  border: "0.2px solid gray",
                                  color: "white",
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                <div className="c_table">
                  <div className="c_table-container">
                    <table className="c_user-table" style={{ width: "32rem" }}>
                      <thead>
                        <tr>
                          <th>Contestant</th>
                          <th style={{ paddingLeft: "10px" }}>Votes</th>
                          <th style={{ paddingLeft: "40px" }}>Profile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contestants.map((contestant) => (
                          <tr key={contestant.id}>
                            <td className="c_contestant-info">
                              <img
                                src={contestant.logo}
                                alt={contestant.name}
                                className="c_contestant-logo"
                              />
                              <span className="c_contestant-name">
                                {contestant.name}
                              </span>
                            </td>
                            <td>{contestant.votes}</td>
                            <td>
                              <button
                                onClick={() => handleProfileClick(contestant)}
                                className="c_profile-button"
                              >
                                Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {selectedContestant && (
              <Popup
                contestant={selectedContestant}
                onClose={handleClosePopup}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
