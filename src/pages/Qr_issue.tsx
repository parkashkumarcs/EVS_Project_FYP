// import React from "react";
import P_sidebar from "../components/P_sidebar";
import P_navbar from "../components/P_navbar";
// import P_box from "../components/P_box";
import QRCodeGenerator from "./QRCodeGenerator";
import "../styles/Qr_issue.css";
// import ProfileQrBox from "../components/ProfileQrBox"

function Qr_issue() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Pass icon and msg2 as optional props */}
      <P_navbar msg="Dashboard" />
      <div
        style={{
          display: "flex",
          height: "100%",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <P_sidebar />

        <div className="qmain-content">
          {/* <div className="Qbox"></div> */}
          <div className="Qcontent">
            <QRCodeGenerator />
            {/* <div className="profile-b"><ProfileQrBox /></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qr_issue;
