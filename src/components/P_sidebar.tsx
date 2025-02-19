import React, { useState } from "react";
import { FaBars, FaHouseUser, FaQrcode } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const P_sidebar: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(true);

  // Function to toggle sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true }); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div style={styles.sidebarContainer}>
      {/* Vertical Icons on the blue bar */}
      <div style={styles.verticalIcons}>
        <div
          style={styles.icon}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={toggleSidebar}
        >
          <FaBars size={24} color="white" />
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/presiding-home"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaHouseUser size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/qr_issue"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaQrcode size={24} color="white" />
          </NavLink>
        </div>
      </div>

      {/* Main Sidebar Content */}
      <div style={isOpen ? styles.mainSidebarOpen : styles.mainSidebarClosed}>
        {isOpen && (
          <>
            <div style={styles.healthCareSection}>
              <img
                src="./src/evs-system.png"
                alt="Logo"
                className="logo"
                style={styles.sectionHeader}
              />
            </div>

            <div style={styles.section}>
              <ul className="sidebar-links" style={styles.navList}>
                <li>
                  <NavLink
                    to="/presiding-home"
                    className="dashboard"
                    style={({ isActive }) => ({
                      ...styles.navItem,
                      ...(isActive ? styles.activeNavItem : {}),
                    })}
                    onMouseEnter={({ currentTarget }) => {
                      if (!currentTarget.classList.contains("active")) {
                        currentTarget.style.backgroundColor = "#e3e9f5"; // Hover background
                      }
                    }}
                    onMouseLeave={({ currentTarget }) => {
                      if (!currentTarget.classList.contains("active")) {
                        currentTarget.style.backgroundColor = ""; // Reset hover background
                      }
                    }}
                  >
                    <i
                      className="fa-solid fa-house"
                      style={styles.iconInList}
                    ></i>
                    <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                      Dashboard
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/qr_issue"
                    className="qr-issue"
                    style={({ isActive }) => ({
                      ...styles.navItem,
                      ...(isActive ? styles.activeNavItem : {}),
                    })}
                    onMouseEnter={({ currentTarget }) => {
                      if (!currentTarget.classList.contains("active")) {
                        currentTarget.style.backgroundColor = "#e3e9f5"; // Hover background
                      }
                    }}
                    onMouseLeave={({ currentTarget }) => {
                      if (!currentTarget.classList.contains("active")) {
                        currentTarget.style.backgroundColor = ""; // Reset hover background
                      }
                    }}
                  >
                    <i
                      className="fa-solid fa-qrcode"
                      style={styles.iconInList}
                    ></i>
                    <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                      QR Issue
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div style={styles.qrCard}>
              <img
                src="./images/qr-img.png"
                alt="QR Code"
                className="logo"
                style={styles.qrImage}
              />
            </div>

            <div className="sidebar-logout" style={styles.sidebarLogout}>
              <NavLink to="/" className="log" style={styles.navItem}>
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={styles.iconInList}
                ></i>
                <span
                  onClick={handleSignOut}
                  className={`link-text ${isOpen ? "" : "hidden"}`}
                >
                  Logout
                </span>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebarContainer: {
    position: "relative",
    zIndex: "10",
    display: "flex",
    height: "100vh",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    marginTop: "-73px",
    marginBottom: "-8px",
    marginLeft: "-8px",
  },
  verticalIcons: {
    width: "50px",
    backgroundColor: "#0f50e7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: "20px 0",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  mainSidebarOpen: {
    width: "200px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    padding: "20px",
    color: "#1c64f2",
    transition: "width 0.1s ease, opacity 0.5s ease",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainSidebarClosed: {
    width: "0px",
    overflow: "hidden",
    transition: "width 0.1s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  healthCareSection: {
    // border: "2px solid rgba(255, 255, 255, 0.2)",
    // borderRadius: "4px",
    // height: "100px",
    // background: "rgba(255, 255, 255, 0.2)",
    // backdropFilter: "blur(10px)",
    // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // color: "black",
    // fontFamily: "Arial, sans-serif",
    // transition: "transform 0.3s",
    // marginTop: "-10px",

    borderRadius: "4px", // Increased border radius for a softer look
    height: "100px",

    background: "linear-gradient(to top, #ffffff, #cfe0fc)", // Light blue gradient from bottom to top
    backdropFilter: "blur(10px)",
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column", // Stack items vertically
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    fontFamily: "Arial, sans-serif",
    padding: "5px",
    textAlign: "center", // Center text alignment
    transition: "transform 0.3s",
    marginTop: "-10px",
  },
  sectionHeader: {
    width: "100px",
    height: "100px",
    marginTop: "0px",
    marginLeft: "-10px",
  },
  section: {
    marginTop: "20px",
  },
  qrCard: {
    borderRadius: "4px", // Increased border radius for a softer look
    height: "210px", // Adjust height for more content space

    background: "linear-gradient(to bottom, #ffffff, #cfe0fc)", // Light blue gradient from bottom to top
    backdropFilter: "blur(10px)",
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column", // Stack items vertically
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center", // Center text alignment
    transition: "transform 0.3s",
    marginTop: "10px",
  },
  qrImage: {
    width: "190px",
    height: "150px",
  },
  navList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    textDecoration: "none",
    color: "gray",
    transition: "background-color 0.2s ease, color 0.2s ease",
    borderRadius: "4px",
    marginBottom: "5px",
    cursor: "pointer",
    backgroundColor: "", // Default background
  },
  activeNavItem: {
    backgroundColor: "#0f50e7", // Active background color (blue)
    color: "white", // Active text color
  },
  iconInList: {
    marginRight: "10px",
  },
  sidebarLogout: {
    borderRadius: "4px", // Increased border radius for a softer look

    background: "linear-gradient(to left, #ffffff, #cfe0fc)", // Light blue gradient from bottom to top
    backdropFilter: "blur(10px)",
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.2)",
    display: "flex",
    paddingTop: "0px",
    flexDirection: "column", // Stack items vertically
    color: "black",
    fontFamily: "Arial, sans-serif",
    padding: "5px",
    textAlign: "center", // Center text alignment
    transition: "transform 0.3s",
    marginTop: "0px",
  },
};

export default P_sidebar;
