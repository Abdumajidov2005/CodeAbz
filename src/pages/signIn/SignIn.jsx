import React, { useState } from "react";
import "./SignIn.css";
import { baseUrl } from "../services/config";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../services/token";

function SignIn({ setTokens }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/token/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.detail) {
          toast.error(result?.detail);
        } else if(result?.access){
          setToken(result?.access)
          setTokens(getToken())
          toast.success("Muvofaqqiyatli kirdingiz");
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="create-accaunt">
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="accaunt-settings signin"
          >
            <div className="settings">
              <label htmlFor="">Username:</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                required
                placeholder="Username"
              />
            </div>
            <div className="settings">
              <label htmlFor="">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                required
                placeholder="Password"
              />
            </div>
            <Button variant="contained" type="submmit">
              salom
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
