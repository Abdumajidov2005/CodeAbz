import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Problems from "../problems/Problems";
import CodePanels from "../codePanels/CodePanels";
import Scrolltop from "../../components/scroltop/Scrolltop";
import CreateAccaunt from "../createAccount/CreateAccaunt";
import { ToastContainer } from "react-toastify";
import SignIn from "../signIn/SignIn";
import { getToken } from "../services/token";
import ProfilMe from "../profilMe/ProfilMe";
import LeaderBoard from "../leaderboard/LeaderBoard";

function Routers() {
  const [tokens, setTokens] = useState(getToken());
  const [profil, setProfil] = useState(null);
  const [problemData, setProblemData] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Navbar tokens={tokens} setTokens={setTokens} />
        <ToastContainer autoClose={1000} />
        <Scrolltop />
        <Routes>
          <Route path="/" element={<Problems setProblemData={setProblemData} problemData={problemData}/>} />
          <Route
            path="/codepanels/:slug"
            element={<CodePanels profil={profil} setProfil={setProfil} setProblemData={setProblemData}/>}
          />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/signIn" element={<SignIn setTokens={setTokens} />} />
          <Route path="/create accaunt" element={<CreateAccaunt />} />
          <Route
            path="/profil"
            element={<ProfilMe profil={profil} setProfil={setProfil} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
