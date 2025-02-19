import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEllipsisVertical,
  faSignOutAlt,
  faCog, // Settings icon
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Firebase auth
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the import based on your project structure
import "../styles/Navbar.css";

const Navbar: React.FC<{
  msg: string;
  icon?: React.ReactNode;
  msg2?: string;
}> = ({ msg, icon, msg2 }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(""); // State for user name
  const [showEditProfile, setShowEditProfile] = useState(false); // State for profile edit popup
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const uid = currentUser.uid;
          const userDoc = await getDoc(doc(db, "users", uid)); // Adjust to your Firestore structure

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData?.name || "User");
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user is signed in.");
        navigate("/"); // Redirect to login page if the user is logged out
      }
    };

    fetchUserName();
  }, [auth, navigate]); // Add navigate as a dependency

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true }); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSettings = () => {
    navigate("/settings"); // Redirect to settings page
  };

  const handleEditProfile = () => {
    setShowEditProfile(true); // Open edit profile popup
  };

  const closeEditProfile = () => {
    setShowEditProfile(false); // Close edit profile popup
  };

  return (
    <div>
      <div className="navbar-home">
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon && <span style={{ marginRight: "1rem" }}>{icon}</span>}
          {msg2 && (
            <p style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>
              {msg2}
            </p>
          )}
        </div>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginLeft: "-26rem",
          }}
        >
          {msg}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Edit profile triggered by user icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "0.5rem",
            }}
            onClick={handleEditProfile}
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{ height: "1.75rem" }}
            />
            <p style={{ margin: 0 }}>{userName || "User"}</p>
          </div>

          {/* Dropdown menu for settings and sign out */}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              style={{ height: "1.25rem" }}
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "2.5rem",
                  width: "10rem",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  color: "black",
                  zIndex: 1000,
                }}
              >
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  <li>
                    <button
                      onClick={handleSettings}
                      style={{
                        width: "100%",
                        padding: "0.5rem 1rem",
                        textAlign: "left",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCog}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      style={{
                        width: "100%",
                        padding: "0.5rem 1rem",
                        textAlign: "left",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Popup */}
      {showEditProfile && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
            zIndex: 2000,
          }}
        >
          <h2>Edit Profile</h2>
          {/* Add your form for editing profile here */}
          <button onClick={closeEditProfile}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
