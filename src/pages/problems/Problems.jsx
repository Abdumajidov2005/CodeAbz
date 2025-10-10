import React from "react";
import "./Problems.css";
import { Link } from "react-router-dom";

function Problems() {
  const baseData = [
    {
      id: 1,
      question: "Two sum",
    },
    {
      id: 2,
      question: "Two sum and massives",
    },
    {
      id: 3,
      question: "Two sum with number tips",
    },
  ];
  return (
    <>
      <div className="problems">
        <div className="container">
          <div className="problems-panel">
            <ul className="problems_questions">
              {baseData?.map((item) => {
                return <Link to={"/codepanels"}>{item?.question}</Link>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Problems;
