import { useState } from "react";
import { db } from "../firebase"; // Import Firebase configuration (ensure the path is correct)
import { collection, doc, setDoc, Timestamp } from "firebase/firestore"; // Firestore imports
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Boxes from "../components/boxes";
import "../styles/Timings.css";

function Timings() {
  // State to hold form values
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  // State for popup visibility
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Function to handle saving the timing to Firestore
  const saveTimings = async () => {
    try {
      // Convert the startDate and endDate strings to Timestamp objects
      const startDateTime = Timestamp.fromDate(
        new Date(`${startDate}T${startTime}`)
      );
      const endDateTime = Timestamp.fromDate(new Date(`${endDate}T${endTime}`));

      // Reference to the 'votingTiming' collection and document
      const docRef = doc(collection(db, "votingTiming"), "timingDetails");

      // Set the data in Firestore
      await setDoc(docRef, {
        startDate: startDateTime,
        endDate: endDateTime,
      });

      // Show the popup on successful save
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    } catch (error) {
      console.error("Error saving voting timings: ", error);
      alert("Failed to save voting timings. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Navbar msg="Set Voting Time" />

      <div
        style={{
          display: "flex",
          height: "100%",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <Sidebar />

        <div className="mainSection">
          <div className="boxesSection">
            <Boxes />
          </div>
          <div className="timingWrapper">
            <div className="contentWrapper">
              <div className="dateSection">
                <label htmlFor="date" className="startDateLabel">
                  Start Date:
                </label>
                <input
                  type="date"
                  className="startDateInput"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="date" className="endDateLabel">
                  End Date:
                </label>
                <input
                  type="date"
                  className="endDateInput"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="timeSection">
                <label htmlFor="time" className="startTimeLabel">
                  Start Time:
                </label>
                <input
                  type="time"
                  className="startTimeInput"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="time" className="endTimeLabel">
                  End Time:
                </label>
                <input
                  type="time"
                  className="endTimeInput"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="buttonWrapper">
            <button className="saveButton" onClick={saveTimings}>
              Save
            </button>
          </div>

          {/* Popup for success message */}
          {showPopup && <div className="popup">Successfully saved</div>}
        </div>
      </div>
    </div>
  );
}

export default Timings;
