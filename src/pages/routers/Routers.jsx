import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Navbar from "../../components/navbar/Navbar";
import Problems from "../problems/Problems";
import Notice from "../notice/Notice";
import CodePanels from "../codePanels/CodePanels";

function Routers() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/codepanels" element={<CodePanels/>}/>
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
