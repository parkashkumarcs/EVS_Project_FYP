import "../styles/ContactUs.css";

import React from "react";
// import "./ContactUs.css";

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us">
      <h2 style={{ marginTop: "0px", marginLeft: "40%", color: "gray" }}>
        Contact Us
      </h2>
      <p className="description">
        You can cantact us if you have any query or you can also sugest us any
        improvement to do, we are always available for your service, contact us
        now...
      </p>

      <div className="contact-container">
        <div className="contact-details">
          <div className="contact-item">
            <div className="icon-container">
              <i className="fas fa-home icon"></i>
            </div>
            <div className="text">
              <h3>Address</h3>
              <p>
                Sukkur IBA University Nisar Ahmed Siddiqui Road Sukkur Sindh,
                Pakistan
              </p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon-container">
              <i className="fas fa-phone icon"></i>
            </div>
            <div className="text">
              <h3>Phone</h3>
              <p>571-457-2321</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon-container">
              <i className="fas fa-envelope icon"></i>
            </div>
            <div className="text">
              <h3>Email</h3>
              <p>musawerbhutto@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Message</h3>

          <form className="contact-f">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <textarea
              placeholder="Type your Message..."
              required
              style={{ width: "95%" }}
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
