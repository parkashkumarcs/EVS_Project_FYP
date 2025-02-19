import React, { useState, useEffect } from "react";
import "../styles/login_page_style.css";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firestore and Auth
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"; // Import Firebase Auth functions
import { doc, getDoc } from "firebase/firestore";
//here
import RegisterPopup from "../components/RegisterPopup";

interface LoginPageProps {
  setUserRole: (role: string) => void; // Prop to set the role in App component
}

const LoginPage: React.FC<LoginPageProps> = ({ setUserRole }) => {
  const [email, setEmail] = useState<string>(""); // Email for login
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to toggle popup visibility
  const [resetEmail, setResetEmail] = useState<string>(""); // Separate state for password reset email
  const navigate = useNavigate(); // Use navigate for redirection

  //here
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const handleScroll = () => {
    const navbar = document.getElementById("navbar");
    const threshold = 2;

    if (window.scrollY > threshold) {
      if (navbar) {
        navbar.style.backgroundColor = "rgba(34, 34, 34, 0.4)";
      }
    } else {
      if (navbar) {
        navbar.style.backgroundColor = "rgba(34, 34, 34, 1)";
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userRole = userData.role;
        const userDepartment = userData.department;

        setUserRole(userRole);
        localStorage.setItem("userRole", userRole);

        if (userRole === "presiding_officer") {
          localStorage.setItem("officerDepartment", userDepartment);
        }

        if (userRole === "admin") {
          navigate("/admin-home");
        } else if (userRole === "presiding_officer") {
          navigate("/presiding-home");
        } else {
          alert("Unknown role. Please contact support.");
        }
      } else {
        console.error("No such user document!");
        alert("User role not found.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        alert("User not found.");
      } else if (error.code === "auth/wrong-password") {
        alert("Invalid password.");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
      setShowPopup(false); // Close the popup after email is sent
    } catch (error: any) {
      console.error("Error resetting password:", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <>
      <header id="navbar">
        <div className="navbar-logo">
          <img src="images/iba.png" alt="IBA Logo" />
        </div>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/about-us" className="navbar-link">
              {" "}
              {/* Updated to Link component */}
              About Us
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact-us" className="navbar-link">
              {" "}
              {/* Updated to Link component */}
              Contact Us
            </Link>
          </li>
        </ul>
      </header>

      <div className="login-body-div">
        <div className="main-login-div">
          <div className="login-section">
            <div className="login-image">
              <img
                src="images/qr.png"
                alt="Electronic voting system"
                className="login-img"
              />
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-wrapper">
                <div className="login-form">
                  <div className="ll">
                    <span className="login-title">log</span>
                    <span className="login-subtitle">in</span>
                  </div>

                  <div className="form-group">
                    <div
                      className="input-wrapper"
                      style={{ position: "relative" }}
                    >
                      {email === "" && (
                        <MdOutlineEmail
                          style={{
                            position: "absolute",
                            left: "35px",
                            top: "10px",
                            color: "grey",
                            fontSize: "1.2rem",
                          }}
                        />
                      )}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div
                      className="input-wrapper"
                      style={{ position: "relative" }}
                    >
                      {password === "" && (
                        <MdLockOutline
                          style={{
                            position: "absolute",
                            left: "35px",
                            top: "10px",
                            color: "grey",
                            fontSize: "1.2rem",
                          }}
                        />
                      )}
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-input"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        className="togle"
                        onClick={togglePasswordVisibility}
                      />
                      <label className="show-password-label">
                        Show Password
                      </label>
                    </div>
                  </div>

                  <label className="forget-password">
                    <a href="#" onClick={() => setShowPopup(true)}>
                      Forgot Password?
                    </a>
                  </label>

                  <input type="submit" value="Login" className="login-button" />
                  <p style={{ marginTop: "2rem" }}>
                    Don't have an account?{" "}
                    <span>
                      <a
                        href="#"
                        // here
                        onClick={(e) => {
                          e.preventDefault();
                          setShowRegisterPopup(true);
                        }}
                        style={{ textDecoration: "none", color: "gray" }}
                      >
                        Register
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div
          className="pop"
          style={{ backgroundColor: "rgba(0, 208, 194, 0.9)" }}
        >
          <div className="pop-content">
            <h2 style={{ color: "white" }}>Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-pop"
              value={resetEmail} // Use the resetEmail state here
              onChange={(e) => setResetEmail(e.target.value)} // Set the resetEmail state
            />
            <button
              onClick={() => handlePasswordReset(resetEmail)} // Pass the resetEmail for password reset
              className="button-reset"
            >
              Send Reset Email
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="button-reset"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* here */}
      {showRegisterPopup && (
        <RegisterPopup onClose={() => setShowRegisterPopup(false)} />
      )}
    </>
  );
};

export default LoginPage;
