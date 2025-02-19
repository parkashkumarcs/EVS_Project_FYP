import React from "react";
import "../styles/voterCart.css";

const VoterCard: React.FC = () => {
  return (
    <div className="vcard-container">
      {/* Profile Circle, Name (left) and Logo (right) */}
      <div className="vtop-section">
        <div className="vprofile-and-name">
          <div className="vprofile-circle"></div>
          <div className="vname">Fahad Shahzad</div>{" "}
          {/* Replace this with the actual name */}
        </div>
        <img src="/path/to/logo.png" alt="Logo" className="vlogo" />
      </div>

      <div className="vinfo-container">
        <div className="vrow">
          <span className="vlabel">Contact:</span>{" "}
          {/* Replace "ID" with "Contact" */}
          <span>+123-456-7890</span> {/* Replace with the actual contact */}
        </div>
        <div className="vrow">
          <span className="vlabel">CMS ID:</span>{" "}
          {/* Replace "Dept" with "CMS ID" */}
          <span>051-19-0003</span> {/* Replace with the actual CMS ID */}
        </div>
        <div className="vrow">
          <span className="vlabel">Email:</span>{" "}
          {/* Replace "Gender" with "Email" */}
          <span>fahad.shahzad@example.com</span>{" "}
          {/* Replace with the actual email */}
        </div>
        <div className="vrow">
          <span className="vlabel">Department:</span>{" "}
          {/* Replace "Status" with "Department" */}
          <span>Computer Science</span>{" "}
          {/* Replace with the actual department */}
        </div>
        <div className="vrow">
          <span className="vlabel">Gender:</span>{" "}
          {/* Add this new row for Gender */}
          <span>Male</span> {/* Replace with the actual gender */}
        </div>
      </div>
    </div>
  );
};

export default VoterCard;
