// import React, { useState } from "react";
// import Boxes from "../components/boxes";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import OptionsMenu from "../components/OptionMenu";
// import "../styles/report.css";
// import { toPng } from "html-to-image"; // Import html-to-image for capturing the div

// // import { faHome } from "@fortawesome/free-solid-svg-icons"; // Import desired icon
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function Report() {
//   const [selectedDepartment, setSelectedDepartment] = useState<string>("");

//   const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDepartment(e.target.value);
//   };

//   // Function to handle download as image
//   const handleDownload = () => {
//     const node = document.getElementById("rp-content"); // Capture the div by ID
//     if (node) {
//       toPng(node, { backgroundColor: "white" }) // Set the background color to white
//         .then((dataUrl) => {
//           const link = document.createElement("a");
//           link.href = dataUrl;
//           link.download = "report.png"; // Name of the downloaded image
//           link.click(); // Trigger the download
//         })
//         .catch((error) => {
//           console.error("Error capturing the div as an image", error);
//         });
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
//       {/* Pass icon and msg2 as optional props */}
//       <Navbar
//         msg="View Report"

//       />

//       <div style={{ display: "flex", height: "100%", marginTop: "32px", width: "100%" }}>
//         <Sidebar />

//         <div className="rmain-content">
//           <div className="rbox">
//             <Boxes />
//           </div>

//           <div className="ccenter">
//             <div className="menu">
//               <OptionsMenu
//                 selectedOption={selectedDepartment}
//                 handleChange={handleDepartmentChange}
//               />
//             </div>

//             <div className="Rp">
//               Report
//               {/* Add an id to the div to capture */}
//               <div className="rp" id="rp-content">
//                 <p className="dpt">BBA Department</p>
//                 <p className="preTag">
//                   1st position:
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ali&nbsp;&nbsp;(1000 votes)
//                 </p>
//                 <p className="preTag">
//                   2nd position:
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Khan&nbsp;&nbsp;(800 votes)
//                 </p>
//                 <p className="preTag">
//                   3rd position:
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ahsan&nbsp;&nbsp;(7000 votes)
//                 </p>
//               </div>

//               {/* Add the download button */}
//               <button className="dow" onClick={handleDownload}>
//                 Download
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Report;
import React, { useState } from "react";
import Boxes from "../components/boxes";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionMenu";
import "../styles/report.css";
import { toPng } from "html-to-image"; // Import html-to-image for capturing the div
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; // Ensure Firebase is initialized

// Define the Contestant type
interface Contestant {
  id: string;
  name: string; // Adjust type as necessary
  votes: number; // Assuming votes is a number
  department: string; // Assuming department is also stored
}

function Report() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [contestants, setContestants] = useState<Contestant[]>([]); // State to hold contestants

  const handleDepartmentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const department = e.target.value;
    setSelectedDepartment(department);

    // Fetch contestants for the selected department
    if (department) {
      await fetchContestants(department);
    } else {
      setContestants([]); // Clear contestants if no department is selected
    }
  };

  // Function to fetch contestants from Firestore based on selected department
  const fetchContestants = async (department: string) => {
    try {
      const q = query(
        collection(db, "contestants"),
        where("department", "==", department)
      );
      const querySnapshot = await getDocs(q);
      const fetchedContestants: Contestant[] = []; // Specify the type here

      querySnapshot.forEach((doc) => {
        fetchedContestants.push({ id: doc.id, ...doc.data() } as Contestant);
      });

      // Sort contestants by votes and get top 3
      const topContestants = fetchedContestants
        .sort((a, b) => b.votes - a.votes) // Assuming 'votes' is a field in your contestant documents
        .slice(0, 3);

      setContestants(topContestants); // Update the state with top 3 contestants
    } catch (error) {
      console.error("Error fetching contestants:", error);
    }
  };

  // Function to handle download as image
  const handleDownload = () => {
    const node = document.getElementById("rp-content"); // Capture the div by ID
    if (node) {
      toPng(node, { backgroundColor: "white" }) // Set the background color to white
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "report.png"; // Name of the downloaded image
          link.click(); // Trigger the download
        })
        .catch((error) => {
          console.error("Error capturing the div as an image", error);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Navbar msg="View Report" />

      <div
        style={{
          display: "flex",
          height: "100%",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <Sidebar />

        <div className="rmain-content">
          <div className="rbox">
            <Boxes />
          </div>

          <div className="ccenter">
            <div className="menu">
              <OptionsMenu
                selectedOption={selectedDepartment}
                handleChange={handleDepartmentChange}
              />
            </div>

            <div className="Rp">
              Report
              {/* Add an id to the div to capture */}
              <div className="rp" id="rp-content">
                <p className="dpt">{selectedDepartment} Department</p>
                {contestants.length > 0 ? (
                  contestants.map((contestant, index) => (
                    <p className="preTag" key={contestant.id}>
                      {index + 1} position: {contestant.name} &nbsp;(
                      {contestant.votes} votes)
                    </p>
                  ))
                ) : (
                  <p>No contestants found for this department.</p>
                )}
              </div>
              {/* Add the download button */}
              <button className="dow" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
