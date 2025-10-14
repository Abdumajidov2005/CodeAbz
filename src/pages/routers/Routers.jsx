import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Problems from "../problems/Problems";
import Notice from "../notice/Notice";
import CodePanels from "../codePanels/CodePanels";
import Scrolltop from "../../components/scroltop/Scrolltop";
import CreateAccaunt from "../createAccount/CreateAccaunt";
import { ToastContainer } from "react-toastify";
import SignIn from "../signIn/SignIn";
import { getToken } from "../services/token";

function Routers() {

  const [tokens, setTokens] = useState(getToken())
 
  return (
    <>
      <BrowserRouter>
        <Navbar tokens={tokens} setTokens={setTokens} />
        <ToastContainer autoClose={1000} />
        <Scrolltop />
        <Routes>
          <Route path="/" element={<Problems />} />
          <Route path="/codepanels/:slug" element={<CodePanels />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/signIn" element={<SignIn  setTokens={setTokens} />} />
          <Route path="/create accaunt" element={<CreateAccaunt />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
