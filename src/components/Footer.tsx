import React from "react";
import "../styles/footer.css";

interface FooterProps {
  style?: React.CSSProperties; // Optional `style` prop
}

export default function Footer({ style }: FooterProps) {
  return (
    <>
      <footer className="footer" style={style}>
        <p style={{ color: "black", fontSize: "12px" }}>
          Copyright &copy; 2024 by Electronic Voting System | All Rights
          Reserved.
        </p>
        <a href="#home">
          <i className="bx bxs-arrow-from-bottom"></i>
        </a>
      </footer>
    </>
  );
}
