import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // Adjust the path to your firebaseConfig file
import "../styles/Form.css";

interface FormData {
  name: string;
  contact: string;
  cmsId: string;
  email: string;
  department: string;
  gender: string;
  errors: {
    contact?: string;
    cmsId?: string;
    email?: string; // Added email error
    [key: string]: string | undefined;
  };
  selectedFile: File | null;
}

function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    cmsId: "",
    email: "",
    department: "",
    gender: "",
    errors: {},
    selectedFile: null,
  });

  // State to manage the popup visibility
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let errors = { ...formData.errors };

    // Contact validation
    if (name === "contact" && !/^\d{11}$/.test(value)) {
      errors.contact = "Contact number must be 11 digits and start with 0";
    } else {
      delete errors.contact; // Clear error if valid
    }

    // CMS ID validation
    if (name === "cmsId" && !/^\d{3}-\d{2}-\d{4}$/.test(value)) {
      errors.cmsId = "CMS ID must be in the format xxx-xx-xxxx";
    } else {
      delete errors.cmsId; // Clear error if valid
    }

    // Email validation
    if (name === "email" && !value.includes("@")) {
      errors.email = "Please enter a valid email address with '@'.";
    } else {
      delete errors.email; // Clear error if valid
    }

    // Handle file selection
    if (
      name === "selectedFile" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setFormData({ ...formData, selectedFile: e.target.files[0], errors });
    } else {
      setFormData({ ...formData, [name]: value, errors });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(formData.errors).length > 0) {
      alert("Please correct the validation errors before submitting the form.");
      return;
    }

    try {
      let logoURL = "";
      if (formData.selectedFile) {
        // Upload logo to Firebase Storage
        const logoRef = ref(
          storage,
          `contestantLogos/${formData.selectedFile.name}`
        );
        const snapshot = await uploadBytes(logoRef, formData.selectedFile);
        logoURL = await getDownloadURL(snapshot.ref);
      }

      // Save form data to Firestore with logo URL
      await addDoc(collection(db, "contestants"), {
        name: formData.name,
        contact: formData.contact,
        cmsId: formData.cmsId,
        email: formData.email,
        department: formData.department,
        gender: formData.gender,
        logo: logoURL, // Save the logo URL
      });

      // Show success popup
      setShowPopup(true);

      // Reset form after submission
      setFormData({
        name: "",
        contact: "",
        cmsId: "",
        email: "",
        department: "",
        gender: "",
        errors: {},
        selectedFile: null,
      });

      // Hide popup after a delay
      setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error registering contestant: ", error);
      alert("Error occurred while submitting the form. Please try again.");
    }
  };

  const departments = [
    "CS",
    "AF",
    "BBA",
    "B.Ed",
    "EE",
    "AI",
    "SE",
    "Mathematics",
    "Media",
    "Agree Business",
  ];
  const genders = ["Male", "Female", "Other"];

  return (
    <div>
      {showPopup && <div className="popup">Successfully registered!</div>}
      <form onSubmit={handleSubmit} className="fo">
        <label className="lnm">
          <input
            className="nm"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="lct">
          <input
            className="ct"
            type="text"
            name="contact"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={handleChange}
            maxLength={11}
          />
          {formData.errors.contact && (
            <span className="error">{formData.errors.contact}</span>
          )}
        </label>
        <label className="lcm">
          <input
            className="cm"
            type="text"
            placeholder="Enter CMS ID"
            name="cmsId"
            value={formData.cmsId}
            onChange={handleChange}
            maxLength={14}
          />
          {formData.errors.cmsId && (
            <span className="error">{formData.errors.cmsId}</span>
          )}
        </label>
        <label className="lem">
          <input
            className="em"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {formData.errors.email && (
            <span className="error">{formData.errors.email}</span>
          )}
        </label>
        <div className="form-row">
          <label className="ldp">
            <select
              className="dp"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>

          <label className="lgn">
            <select
              className="gn"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </label>
        </div>

        <input
          id="file-upload"
          type="file"
          name="selectedFile"
          className="File-input"
          placeholder="logo"
          onChange={handleChange}
        />

        <button className="btn1" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Form;
