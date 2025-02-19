import React, { useState } from "react";
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission and register admin
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role: "admin",
      });

      alert("Admin registered successfully!");
      onClose(); // Close the popup
    } catch (error: any) {
      console.error("Registration error:", error);
      alert("Failed to register admin. Please try again.");
    }
  };

  return (
    <div className="g-register-popup">
      <div className="g-register-popup-content">
        <h2 className="g-register-title">Admin Registration</h2>
        <form className="g-register-form" onSubmit={handleRegister}>
          <div className="g-form-group">
            <input
              type="text"
              className="g-input-text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="g-input-text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="g-form-group">
            <input
              type="email"
              className="g-input-email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="g-input-text g-input-address"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="g-register-button">
            Register
          </button>
        </form>
        <button onClick={onClose} className="g-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterPopup;
