import React from "react";
import "./Navbar.css";
import { FaCode, FaRegUser } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <FaCode />
            <h1>CodeAbz</h1>
          </div>
          <ul className="links">
            <li>salom</li>
            <li>salom</li>
            <li>salom</li>
          </ul>
          <div className="icons">
            <p>
              <FaCode />
            </p>
            <p>
              <FaRegUser />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
