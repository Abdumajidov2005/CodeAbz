import React, { useEffect, useState } from "react";
import "./CodePanels.css";
import CodeEditor from "../../components/codeEditor/CodeEditor";
import {
  getMasala,
  getProblems,
  getProblemsDetails,
  getTestCase,
} from "../services/app";
import { useParams } from "react-router-dom";

function CodePanels({ profil }) {
  const { slug } = useParams();

  const [details, setDetails] = useState(null);
  const [index, setIndex] = useState(null);
  const [codeBy, setCodeBy] = useState("");
  const [testCase, setTestCase] = useState([]); // ✅ default qiymat: []
  const [activeCaseId, setActiveCaseId] = useState(null);

  useEffect(() => {
    getProblems()?.then((list) => {
      const foundIndex = list.findIndex((item) => item.slug === slug);
      if (foundIndex !== -1) setIndex(foundIndex + 1);
    });

    getProblemsDetails(slug)?.then((data) => {
      setDetails(data);
    });
  }, [slug]);

  useEffect(() => {
    if (!details?.id) return;
    getMasala(details?.id)?.then(setCodeBy);
    getTestCase()?.then((cases) => {
      if (!cases) return;
      setTestCase(cases);
      const filtered = cases?.filter((c) => c.problem === details?.id);
      if (filtered?.length > 0) setActiveCaseId(filtered[0]?.id);
    });
  }, [details]);

  // 🔎 Filterlangan test case’lar
  const filteredCases = Array.isArray(testCase)
    ? testCase
        .filter((item) => codeBy?.problem === item?.problem)
        .sort((a, b) => a.order - b.order)
    : [];

  // 🔎 Hozir aktiv case
  const activeCase = filteredCases.find((item) => item.id === activeCaseId);

  // const getCreateSubmition = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${getToken()}`);

  //   const raw = JSON.stringify({
  //     user: 5,
  //     problem: 51,
  //     code: "class Solution:\n    def solve(self, a: int, b: int) -> int:\n        return a + b",
  //     language: "python",
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${baseUrl}/submissions/create/`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  // };

  return (
    <div className="codePanels">
      <div className="container">
        <div className="coding">
          <h1 className="coding-titles">
            <span>{index}.</span> {details?.title}
          </h1>
          <div className="leveles">
            <span
              className={`difficultys ${details?.difficulty?.toLowerCase()}`}
            >
              {details?.difficulty}
            </span>
          </div>
          <p className="description">{details?.description}</p>
          <div className="example">
            <h2>Example</h2>
            <h4>
              Input:<span>{details?.input_example}</span>
            </h4>
            <h4>
              Output:<span>{details?.output_example}</span>
            </h4>
          </div>
        </div>

        <div className="submitions-borderss">
          <CodeEditor
            codeBy={codeBy?.template_code || ""}
            setCodeBy={(value) =>
              setCodeBy((prev) => ({ ...prev, template_code: value }))
            }
            profil={profil}
          />

          <div className="submition">
            {/* CASE LIST */}
            <div className="case-list">
              {filteredCases.length > 0 ? (
                filteredCases.map((item, index) => (
                  <div
                    key={item?.id}
                    onClick={() =>
                      setActiveCaseId(
                        activeCaseId === item?.id ? null : item?.id
                      )
                    }
                    className={`case ${
                      activeCaseId === item?.id ? "active" : ""
                    }`}
                  >
                    <p>case {index + 1}</p>
                  </div>
                ))
              ) : (
                <p>No test cases found</p>
              )}
            </div>

            {/* CONTENT AREA — pastda butun widthni egallaydi */}
            {activeCase && (
              <div className="testCase-contents-wide">
                <p>
                  <strong>Input:</strong> {activeCase.input_data}
                </p>
                <p>
                  <strong>Expected:</strong> {activeCase.expected_output}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodePanels;
