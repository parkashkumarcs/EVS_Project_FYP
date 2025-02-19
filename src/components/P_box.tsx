// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase"; // Ensure Firebase is initialized
// import "../styles/P_box.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// interface PBoxProps {
//   unvotedCount: number;
//   votedCount: number;
// }

// const P_box: React.FC<PBoxProps> = ({ unvotedCount, votedCount }) => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [remainingTime, setRemainingTime] = useState<string | null>(null);
//   const [statusMessage, setStatusMessage] = useState<string | null>(null);

//   // Fetch startDate and endDate from Firebase
//   const fetchVotingDates = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "votingTiming"));

//       if (!querySnapshot.empty) {
//         const firstDoc = querySnapshot.docs[0]; // Get the first document
//         const votingData = firstDoc.data();

//         if (votingData && votingData.startDate && votingData.endDate) {
//           const start = new Date(votingData.startDate.seconds * 1000); // Convert Firestore timestamp to Date
//           const end = new Date(votingData.endDate.seconds * 1000);

//           setStartDate(start); // Set the start date
//           setEndDate(end); // Set the end date
//         } else {
//           console.error(
//             "startDate or endDate field not found in the document!"
//           );
//         }
//       } else {
//         console.log("No voting timing document found in Firebase!");
//       }
//     } catch (error) {
//       console.error("Error fetching voting dates:", error);
//     }
//   };

//   // Calculate remaining time until the voting end
//   const calculateRemainingTime = () => {
//     if (!endDate) return;

//     const now = new Date();
//     const timeDiff = endDate.getTime() - now.getTime();

//     if (timeDiff > 0) {
//       const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       setRemainingTime(`${hours}h ${minutes}m until voting ends`);
//     } else {
//       setRemainingTime(null);
//       setStatusMessage("Voting closed");
//     }
//   };

//   useEffect(() => {
//     fetchVotingDates(); // Fetch dates on component mount
//   }, []);

//   useEffect(() => {
//     if (endDate) {
//       calculateRemainingTime(); // Update remaining time if endDate is set
//       const interval = setInterval(calculateRemainingTime, 1000); // Update every second
//       return () => clearInterval(interval); // Cleanup interval on unmount
//     }
//   }, [endDate]);

//   // Determine the display based on the current time, startDate, and endDate
//   const renderVotingInfo = () => {
//     if (!startDate || !endDate) {
//       return <p>Loading...</p>;
//     }

//     const now = new Date();

//     if (now > endDate) {
//       return <p>{statusMessage}</p>; // Voting is closed
//     } else if (now < startDate) {
//       // Future date
//       return (
//         <div>
//           <p className="genNum" style={{ fontSize: "12px" }}>
//             Start: {startDate.toLocaleString()}
//           </p>
//           <p className="genNum" style={{ fontSize: "12px" }}>
//             End: {endDate.toLocaleString()}
//           </p>
//         </div>
//       );
//     } else if (now >= startDate && now <= endDate) {
//       // Voting is currently running
//       const remainingDuration = endDate.getTime() - now.getTime();
//       if (remainingDuration > 0) {
//         setRemainingTime(
//           `${Math.floor(remainingDuration / (1000 * 60 * 60))}h ${Math.floor(
//             (remainingDuration % (1000 * 60 * 60)) / (1000 * 60)
//           )}m until voting ends`
//         );
//         return <p>{remainingTime}</p>;
//       } else {
//         return <p>{statusMessage}</p>; // This case will not usually trigger since we handle end date above.
//       }
//     } else {
//       return <p>Calculating...</p>;
//     }
//   };

//   return (
//     <div className="container-boxes">
//       <div className="box-primary">
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <p
//             className="genbox"
//             style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "17px" }}
//           >
//             Voted Students
//           </p>
//           <p className="genNum">{votedCount}</p>
//           <p style={{ color: "white", marginTop: "-22px", marginLeft: "12px" }}>
//             total number of voted students
//           </p>
//         </div>
//         <div className="genx">
//           <i
//             className="fa-solid fa-check-to-slot"
//             style={{
//               marginLeft: "10px",
//               marginTop: "10px",
//               fontSize: "20px",
//               color: "white",
//             }}
//           ></i>
//         </div>
//       </div>

//       <div className="box-secondary">
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <p
//             className="genbox"
//             style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "17px" }}
//           >
//             Unvoted Students
//           </p>
//           <p className="genNum">{unvotedCount}</p>
//           <p
//             style={{
//               color: "white",
//               marginTop: "-22px",
//               marginLeft: "12px",
//               fontSize: "12px",
//             }}
//           >
//             total number of unvoted students
//           </p>
//         </div>
//         <div className="genx1">
//           <i
//             className="fa-solid fa-user"
//             style={{
//               marginLeft: "10px",
//               marginTop: "10px",
//               fontSize: "20px",
//               color: "white",
//             }}
//           ></i>
//         </div>
//       </div>

//       {/* Box for Voting Dates and Remaining Time */}
//       <div className="box-third">
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <p
//             className="genbox"
//             style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "17px" }}
//           >
//             Voting Info
//           </p>
//           <p style={{ fontSize: "12px", marginLeft: '17px', marginTop: '33px' }}>{renderVotingInfo()}</p>
//         </div>
//         <div className="genx3">
//           <i
//             className="fa-solid fa-clock"
//             style={{
//               marginLeft: "10px",
//               marginTop: "10px",
//               fontSize: "20px",
//               color: "white",
//             }}
//           ></i>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default P_box;

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure Firebase is initialized
import "../styles/P_box.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface PBoxProps {
  unvotedCount: number;
  votedCount: number;
}

const P_box: React.FC<PBoxProps> = ({ unvotedCount, votedCount }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Fetch startDate and endDate from Firebase
  const fetchVotingDates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "votingTiming"));

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0]; // Get the first document
        const votingData = firstDoc.data();

        if (votingData && votingData.startDate && votingData.endDate) {
          const start = new Date(votingData.startDate.seconds * 1000); // Convert Firestore timestamp to Date
          const end = new Date(votingData.endDate.seconds * 1000);

          setStartDate(start); // Set the start date
          setEndDate(end); // Set the end date
        } else {
          console.error(
            "startDate or endDate field not found in the document!"
          );
        }
      } else {
        console.log("No voting timing document found in Firebase!");
      }
    } catch (error) {
      console.error("Error fetching voting dates:", error);
    }
  };

  // Calculate remaining time until the voting end
  const calculateRemainingTime = () => {
    if (!endDate) return;

    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();

    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      setRemainingTime(`${hours}h ${minutes}m until voting ends`);
    } else {
      setRemainingTime(null);
      setStatusMessage("Voting closed");
    }
  };

  useEffect(() => {
    fetchVotingDates(); // Fetch dates on component mount
  }, []);

  useEffect(() => {
    if (endDate) {
      calculateRemainingTime(); // Update remaining time if endDate is set
      const interval = setInterval(calculateRemainingTime, 1000); // Update every second
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [endDate]);

  // Determine the display based on the current time, startDate, and endDate
  const renderVotingInfo = () => {
    if (!startDate || !endDate) {
      return <p>Loading...</p>;
    }

    const now = new Date();

    if (now > endDate) {
      return <p>{statusMessage}</p>; // Voting is closed
    } else if (now < startDate) {
      // Future date
      return (
        <div>
          <p className="genNum" style={{ fontSize: "12px" }}>
            Start: {startDate.toLocaleString()}
          </p>
          <p className="genNum" style={{ fontSize: "12px" }}>
            End: {endDate.toLocaleString()}
          </p>
        </div>
      );
    } else if (now >= startDate && now <= endDate) {
      // Voting is currently running
      return <p>{remainingTime}</p>; // Display the remaining time
    } else {
      return <p>Calculating...</p>;
    }
  };

  return (
    <div className="container-boxes">
      <div className="box-primary">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="genbox"
            style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "17px" }}
          >
            Voted Students
          </p>
          <p className="genNum">{votedCount}</p>
          <p style={{ color: "white", marginTop: "-22px", marginLeft: "12px" }}>
            total number of voted students
          </p>
        </div>
        <div className="genx">
          <i
            className="fa-solid fa-check-to-slot"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              fontSize: "20px",
              color: "white",
            }}
          ></i>
        </div>
      </div>

      <div className="box-secondary">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="genbox"
            style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "17px" }}
          >
            Unvoted Students
          </p>
          <p className="genNum">{unvotedCount}</p>
          <p
            style={{
              color: "white",
              marginTop: "-22px",
              marginLeft: "12px",
              fontSize: "12px",
            }}
          >
            total number of unvoted students
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

      {/* Box for Voting Dates and Remaining Time */}
      <div className="box-third">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="genbox"
            style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "17px" }}
          >
            Voting Info
          </p>
          <p
            style={{ fontSize: "12px", marginLeft: "17px", marginTop: "33px" }}
          >
            {renderVotingInfo()}
          </p>
        </div>
        <div className="genx3">
          <i
            className="fa-solid fa-clock"
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
};

export default P_box;
