import React, { useState } from "react";
import "./Navbar.css";
import { FaCode, FaCoins, FaRegUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { getToken } from "../../pages/services/token";
import { baseUrl } from "../../pages/services/config";

function Navbar({ tokens, setTokens }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const getProfile = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/users/me/`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="navbar">
        <div className="container">
          <Link to={"/"} className="logo">
            <FaCode />
            <h1>CodeAbz</h1>
          </Link>
          <ul className="links">
            <NavLink to={"/"}>Masalalar</NavLink>
            <NavLink to={"/leaderboard"}>LeaderBoard</NavLink>
          </ul>
          <div className="icons">
            <NavLink to={"/create accaunt"}>Create accaunt</NavLink>
            <NavLink to={"/signIn"}>SignIn</NavLink>
            <p>
              <FaCoins />
            </p>
            {tokens ? (
              <p
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <FaRegUser />
              </p>
            ) : (
              ""
            )}
            <div className={`modal ${showModal ? "active" : ""}`}>
              <p
                onClick={() => {
                  setShowModal(false);
                }}
                className="xmark"
              >
                <FaXmark />
              </p>
              <h3>Kabinet</h3>
              <Link to={"/profil"} onClick={()=>{
                setShowModal(false)
              }}>Profilni ko'rish</Link>
              <span
                onClick={() => {
                  localStorage.clear();
                  setTokens(null);
                  setShowModal(false);
                  navigate("/create accaunt");
                }}
              >
                Accauntdan chiqish
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
