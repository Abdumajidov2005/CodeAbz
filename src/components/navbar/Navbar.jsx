import React from "react";
import "./Navbar.css";
import { FaCode, FaCoins, FaRegUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function Navbar() {


  return (
    <>
      <div className="navbar">
        <div className="container">
          <Link to={"/"} className="logo">
            <FaCode />
            <h1>CodeAbz</h1>
          </Link>
          <ul className="links">
            <NavLink to={"/"}>Bosh sahifa</NavLink>
            <NavLink to={"/problems"}>Masalalar</NavLink>
            <NavLink to={"/notice"}>Komentariyalar</NavLink>
          </ul>
          <div className="icons">
            <p>
              <FaCoins />
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
