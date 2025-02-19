import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Boxes from "../components/boxes";
import Form from "../components/form";
import "../styles/contestant.css"; // Your CSS styles
// import { faHome } from "@fortawesome/free-solid-svg-icons"; // Import desired icon
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Contestant() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Pass icon and msg2 as optional props */}
      <Navbar msg="Add Contestant" />

      <div
        style={{
          display: "flex",
          height: "100%",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <Sidebar />
        <div className="cmain-content">
          <div className="cbox">
            <Boxes />
          </div>
          <div className="ctable">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contestant;
