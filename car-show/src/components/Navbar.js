// src/components/Navbar.js
import React from "react";
import "../style.css"; // make sure this has navbar styles

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="logo" className="logo-image" />
        <span className="logo-text">CareerDrift</span>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#detailed-quiz">Detailed Quiz</a></li>
        <li><a href="#basic-quiz" className="nav-button">Basic Quiz</a></li>
      </ul>
    </nav>
  );
}
