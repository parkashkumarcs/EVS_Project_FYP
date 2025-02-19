import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaGooglePlus,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa"; // Import icons from react-icons
import "../styles/AboutUs.css";

// Popup Component
const Popup: React.FC<{
  title: string;
  content: string;
  closePopup: () => void;
}> = ({ title, content, closePopup }) => (
  <div className="popup-overlay" onClick={closePopup}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <h2>{title}</h2>
      <p>{content}</p>
      <button className="close-popup" onClick={closePopup}>
        Close
      </button>
    </div>
  </div>
);

const AboutUs: React.FC = () => {
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const showPopup = (title: string, content: string) => {
    setPopupTitle(title);
    setPopupContent(content);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="about-page">
      <div className="header-image">
        <img
          src="https://img.lovepik.com/background/20211021/large/lovepik-speed-sense-vector-background-image_401624139.jpg"
          alt="Electronic Voting System"
          className="back-img"
        />
      </div>
      <div className="content">
        <div className="sidebar">
          <h2>About Us</h2>
          <ul>
            <li
              onClick={() =>
                showPopup("Leadership", "Details about our leadership.")
              }
              className="sml-links"
            >
              Leadership
            </li>
            <li
              onClick={() =>
                showPopup("Awards & Recognition", "Awards we have won.")
              }
              className="sml-links"
            >
              Awards & Recognition
            </li>
            <li
              onClick={() =>
                showPopup("Investment", "Information about our investments.")
              }
              className="sml-links"
            >
              Investment
            </li>
            <li
              onClick={() =>
                showPopup("Suppliers", "List of our trusted suppliers.")
              }
              className="sml-links"
            >
              Suppliers
            </li>
            <li
              onClick={() =>
                showPopup(
                  "Compliance Overview",
                  "Details about our compliance standards."
                )
              }
              className="sml-links"
            >
              Compliance Overview
            </li>
          </ul>
          <div className="social-icons">
            <FaFacebook size={30} style={{ color: "blue", width: "20px" }} />
            <FaTwitter size={30} style={{ color: "gray", width: "20px" }} />
            <FaGooglePlus
              size={30}
              style={{ color: "rgb(145, 4, 21)", width: "20px" }}
            />
            <FaLinkedin
              size={30}
              style={{ color: "rgb(7, 12, 166)", width: "20px" }}
            />
            <FaEnvelope
              size={30}
              style={{ color: "rgb(196, 6, 29)", width: "20px" }}
            />
          </div>
          <button className="print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
        <div className="main-content">
          <h1>About Us</h1>
          <p>
            The Electronic Voting System (EVS) for Sukkur IBA University’s
            Student Council Elections ensures security, efficiency, and
            user-friendliness. It includes modules for User Management,
            Contestant Registration, and QR Code Generation.
          </p>
          <p>
            With a focus on layered architecture, data encryption, and error
            handling, it guarantees data integrity and confidentiality. The EVS
            adapts to workloads, offering a transparent experience and fair
            elections, and serves as a scalable, secure model for other
            institutions’ election processes.
          </p>
          <div className="our-purpose">
            <h3 style={{ color: "green" }}>Our Purpose</h3>
            <p>
              We believe, the Electronic Voting System (EVS) for Sukkur IBA
              University offers a secure, efficient, and transparent platform
              for student council elections. It ensures data integrity,
              user-friendliness, and adaptability, meeting institutional
              standards for a fair and reliable electoral process.
            </p>
          </div>
        </div>
        <div className="side-image">
          <img src="./src/evs-system.png" alt="Scientist at work" />
          <div className="how-we-work">
            <h4>How We Work</h4>
            <p>
              We're a dedicated team working together on this project, where
              each of us contributes our unique skills and expertise to ensure
              its success. Our collective effort allows us to tackle challenges,
              collaborate on creative solutions, and make continuous progress
              towards achieving our goals.
            </p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupVisible && popupContent && (
        <Popup
          title={popupTitle}
          content={popupContent}
          closePopup={closePopup}
        />
      )}
    </div>
  );
};

export default AboutUs;
