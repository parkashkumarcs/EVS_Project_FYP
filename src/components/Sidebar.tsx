import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  FaBars,
  FaHome,
  FaUserPlus,
  FaUser,
  FaUpload,
  FaPoll,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
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
      {/* Toggle Icon */}
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
            to="/admin-home"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaHome size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/add-officer"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaUserPlus size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/contestant"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaUser size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/upload-voters"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaUpload size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/report"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaPoll size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/timings"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaClock size={24} color="white" />
          </NavLink>
        </div>
        <div style={styles.icon}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              transform: isActive ? "scale(1.2)" : "none",
            })}
          >
            <FaSignOutAlt size={24} color="white" />
          </NavLink>
        </div>
      </div>

      {/* Main Sidebar Content */}
      <div style={isOpen ? styles.mainSidebarOpen : styles.mainSidebarClosed}>
        {isOpen && (
          <>
            {/* Health Care Section */}
            <div style={styles.healthCareSection}>
              <img
                src="./src/evs-system.png"
                alt="Logo"
                className="logo"
                style={styles.sectionHeader}
              />
            </div>

            <div style={styles.section}>
              <div className="sidebar-content">
                <ul className="sidebar-links" style={styles.navList}>
                  <li>
                    <NavLink
                      to="/admin-home"
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
                      to="/add-officer"
                      className="add_officer"
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
                        className="fa-solid fa-user-plus"
                        style={styles.iconInList}
                      ></i>
                      <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                        Add Officers
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contestant"
                      className="contest"
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
                        className="fa-solid fa-user"
                        style={styles.iconInList}
                      ></i>
                      <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                        Add Contestant
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/upload-voters"
                      className="sheet"
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
                        className="fa-solid fa-sheet-plastic"
                        style={styles.iconInList}
                      ></i>
                      <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                        Upload Voters
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/report"
                      className="report"
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
                        className="fa-solid fa-square-poll-vertical"
                        style={styles.iconInList}
                      ></i>
                      <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                        Reports Card
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/timings"
                      className="time"
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
                        className="fa-solid fa-clock"
                        style={styles.iconInList}
                      ></i>
                      <span className={`link-text ${isOpen ? "" : "hidden"}`}>
                        Voting Timing
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* QR Code Card */}
            <div style={styles.qrCard}>
              <img
                src="./images/qr-img.png"
                alt="QR Code"
                className="logo"
                style={styles.qrImage}
              />
            </div>

            {/* Logout link positioned at the bottom */}
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
    display: "flex",
    height: "100vh",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    marginTop: "-73px",
    marginBottom: "-8px",
    marginLeft: "-8px",
    zIndex: "10" /* Higher z-index */,
  },
  verticalIcons: {
    width: "50px",
    backgroundColor: "#0f50e7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: "12px 0",
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
    height: "170px", // Adjust height for more content space

    background: "linear-gradient(to bottom, #ffffff, #cfe0fc)", // Light blue gradient from bottom to top
    backdropFilter: "blur(10px)",
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column", // Stack items vertically
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    fontFamily: "Arial, sans-serif",
    padding: "10px",
    textAlign: "center", // Center text alignment
    transition: "transform 0.3s",
    marginTop: "0px",
  },
  qrImage: {
    width: "190px",
    height: "150px",
    borderRadius: "4px",
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
    // alignItems: "center",
    // justifyContent: "center",
    color: "black",
    fontFamily: "Arial, sans-serif",
    padding: "5px",
    textAlign: "center", // Center text alignment
    transition: "transform 0.3s",
    marginTop: "5px",
  },
};

export default Sidebar;
