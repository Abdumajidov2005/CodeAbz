import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Problems from "../problems/Problems";
import Notice from "../notice/Notice";
import CodePanels from "../codePanels/CodePanels";
import Scrolltop from "../../components/scroltop/Scrolltop";

function Routers() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Scrolltop />
        <Routes>
          <Route path="/" element={<Problems />} />
          <Route path="/codepanels/:slug" element={<CodePanels />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
