import React, { useState, FormEvent, ChangeEvent } from "react";
import { auth, db } from "../firebase"; // Import auth for Authentication and db for Firestore
import { doc, setDoc } from "firebase/firestore"; // Import setDoc for setting document data
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the function for creating a user
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Boxes from "../components/boxes";
import "../styles/AddOfficer.css";

const AddOfficer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Register the officer in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set the officer's details in Firestore, using UID as the document ID
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid, // Store the Firebase user ID
        email,
        name,
        department,
        role: "presiding_officer", // Automatically assign the role of presiding officer
      });

      // Clear the form after successful submission
      setEmail("");
      setName("");
      setPassword("");
      setDepartment("");

      // Show success popup
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during registration: ", error.message);
        alert("Error registering officer: " + error.message);
      } else {
        console.error("Unknown error occurred: ", error);
        alert("Error registering officer: An unknown error occurred.");
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email matches the pattern
    if (!emailPattern.test(inputEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear the error if the email is valid
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Pass icon and msg2 as optional props */}
        <Navbar msg="Add Officer" />

        <div
          style={{
            display: "flex",
            height: "100%",
            marginTop: "32px",
            width: "100%",
          }}
        >
          <Sidebar />

          <div className="amain-content">
            <div className="Obox">
              <Boxes />
            </div>

            <div className="Ocontent">
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
                className="fo"
              >
                <div className="c1">
                  <label
                    htmlFor="Oemail"
                    className="Oem"
                    style={{
                      marginTop: "2px",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "250px",
                    }}
                  >
                    <input
                      type="email"
                      id="Oemail"
                      placeholder="Enter email"
                      className="Oemail"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      style={{ marginLeft: "0", marginTop: "2px" }}
                    />
                    {emailError && (
                      <p style={{ color: "red", fontSize: "8px" }}>
                        {emailError}
                      </p>
                    )}
                  </label>
                </div>

                <div className="c2">
                  <label
                    htmlFor="Oname"
                    className="On"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "250px",
                      marginTop: "-52px",
                    }}
                  >
                    <input
                      type="text"
                      id="Oname"
                      placeholder="Enter officer name"
                      className="Oname"
                      value={name}
                      onChange={handleNameChange}
                      required
                      style={{ marginLeft: "0", marginTop: "2px" }}
                    />
                  </label>
                </div>

                <div className="c3">
                  <label
                    htmlFor="Opass"
                    className="Op"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "250px",
                      marginTop: "-52px",
                    }}
                  >
                    <input
                      type="password"
                      id="Opass"
                      placeholder="Enter password"
                      className="Opass"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      style={{ marginLeft: "0", marginTop: "2px" }}
                    />
                  </label>
                </div>

                <div className="c4">
                  <label
                    htmlFor="Odept"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "250px",
                      marginTop: "-52px",
                    }}
                  >
                    <select
                      id="Odept"
                      className="Odept"
                      value={department}
                      onChange={handleDepartmentChange}
                      required
                      style={{
                        marginLeft: "0",
                        marginTop: "2px",
                        border: "none",
                        borderRadius: "0px",
                        outline: "none",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <option value="">Select Department</option>
                      <option value="CS">CS</option>
                      <option value="BBA">BBA</option>
                      <option value="EE">EE</option>
                      <option value="B.Ed">B.Ed</option>
                      <option value="SE">SE</option>
                      <option value="AI">AI</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Media">Media</option>
                      <option value="Agree Business">Agree Business</option>
                    </select>
                  </label>
                </div>

                <button className="Add-btn" type="submit">
                  Save
                </button>
              </form>

              {showPopup && <div className="popup">Successfully saved!</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOfficer;
