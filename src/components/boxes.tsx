import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Firestore imports
import { db } from "../firebase"; // Import your Firebase config
import "../styles/boxes.css";

function Boxes() {
  // State to store the number of presiding officers, students, and contestants
  const [presidingOfficerCount, setPresidingOfficerCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [contestantCount, setContestantCount] = useState(0); // New state for contestants

  const subscribeToPresidingOfficers = () => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("role", "==", "presiding_officer")); // Listen to real-time updates
    return onSnapshot(
      q,
      (snapshot) => {
        setPresidingOfficerCount(snapshot.size); // Update count on each change
      },
      (error) => {
        console.error("Error fetching presiding officers:", error);
      }
    );
  };

  const subscribeToStudents = () => {
    const studentsCollection = collection(db, "students"); // Listen to real-time updates
    return onSnapshot(
      studentsCollection,
      (snapshot) => {
        setStudentCount(snapshot.size); // Update count on each change
      },
      (error) => {
        console.error("Error fetching students:", error);
      }
    );
  };

  // New function to subscribe to contestants
  const subscribeToContestants = () => {
    const contestantsCollection = collection(db, "contestants"); // Listen to real-time updates
    return onSnapshot(
      contestantsCollection,
      (snapshot) => {
        setContestantCount(snapshot.size); // Update count on each change
      },
      (error) => {
        console.error("Error fetching contestants:", error);
      }
    );
  };

  useEffect(() => {
    const unsubscribePresidingOfficers = subscribeToPresidingOfficers();
    const unsubscribeStudents = subscribeToStudents();
    const unsubscribeContestants = subscribeToContestants(); // Subscribe to contestants

    // Clean up listeners when component unmounts
    return () => {
      unsubscribePresidingOfficers();
      unsubscribeStudents();
      unsubscribeContestants(); // Clean up contestant listener
    };
  }, []);

  return (
    <div className="boxes">
      <div className="box1">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="genbox"
            style={{ fontSize: "14px", font: "bolder", marginLeft: "17px" }}
          >
            Polling Agent
          </p>
          <p className="genNum">{presidingOfficerCount}</p>
          <p style={{ color: "white", marginTop: "-22px", marginLeft: "12px" }}>
            total number of agents
          </p>
        </div>
        <div className="genx" style={{marginLeft:'110px'}}>
          <i
            className="fa-solid fa-user"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              fontSize: "20px",
              color: "white",
            }}
          ></i>
        </div>
      </div>
      <div className="box2">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="genbox"
            style={{ fontSize: "14px", font: "bolder", marginLeft: "17px" }}
          >
            students
          </p>
          <p className="genNum">{studentCount}</p>
          <p
            style={{
              color: "white",
              marginTop: "-22px",
              marginLeft: "12px",
              fontSize: "12px",
            }}
          >
            total number of voters
          </p>
        </div>
        <div className="genx1">
          <i
            className="fa-solid fa-user"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              fontSize: "20px",
              color: "white",
            }}
          ></i>
        </div>
      </div>
      <div className="box3">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="genbox"
            style={{ fontSize: "14px", font: "bolder", marginLeft: "17px" }}
          >
            contestants
          </p>
          <p className="genNum">{contestantCount}</p>
          <p
            style={{
              color: "white",
              marginTop: "-22px",
              marginLeft: "12px",
              fontSize: "12px",
            }}
          >
            total number of contestants
          </p>
        </div>
        <div className="genx1">
          <i
            className="fa-solid fa-user"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              fontSize: "20px",
              color: "white",
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Boxes;
