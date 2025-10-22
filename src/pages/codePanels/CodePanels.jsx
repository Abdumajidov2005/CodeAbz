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

function CodePanels({ profil, setProfil, setProblemData }) {
  const { slug } = useParams();

  const [details, setDetails] = useState(null);
  const [index, setIndex] = useState(null);
  const [codeBy, setCodeBy] = useState(null);
  const [testCase, setTestCase] = useState([]);
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [output, setOutput] = useState("");

  const [testCaseWatch, setTestCaseWatch] = useState(true);
  const [runTimeWatch, setRunTimeWatch] = useState(false);

  // 🔹 Problems va details olish
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const list = await getProblems();
        if (Array.isArray(list)) {
          const foundIndex = list.findIndex((item) => item.slug === slug);
          if (foundIndex !== -1) setIndex(foundIndex + 1);
        }

        const data = await getProblemsDetails(slug);
        setDetails(data || null);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [slug]);

  // 🔹 Masala va test case’larni olish
  useEffect(() => {
    if (!details?.id) return;

    const fetchMasalaAndCases = async () => {
      try {
        const [masala, cases] = await Promise.all([
          getMasala(details.id),
          getTestCase(),
        ]);

        setCodeBy(masala || null);
        if (Array.isArray(cases)) {
          setTestCase(cases);

          const filtered = cases.filter(
            (c) => c.problem === details.id && c.is_hidden === false
          );
          if (filtered.length > 0) setActiveCaseId(filtered[0].id);
        }
      } catch (error) {
        console.error("Error fetching masala or test cases:", error);
      }
    };

    fetchMasalaAndCases();
  }, [details]);

  // 🔎 Filterlangan test case’lar
  const filteredCases =
    testCase
      ?.filter(
        (item) => item.problem === details?.id && item.is_hidden === false
      )
      ?.sort((a, b) => a.order - b.order) || [];

  // 🔎 Hozir aktiv case
  const activeCase = filteredCases.find((item) => item.id === activeCaseId);

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

          {details?.examples?.map((item, index) => (
            <div key={index} className="example">
              <h2>Example <span>{index + 1}</span>:</h2>
              <h4>
                Input: <span>{item?.ex_input}</span>
              </h4>
              <h4>
                Output: <span>{item?.ex_output}</span>
              </h4>
            </div>
          ))}
        </div>

        <div className="submitions-borderss">
          <div className="editor-boxs">
            <CodeEditor
              codeBy={codeBy}
              setCodeBy={setCodeBy}
              profil={profil}
              setProfil={setProfil}
              setProblemData={setProblemData}
              output={output}
              setOutput={setOutput}
              setRunTimeWatch={setRunTimeWatch}
              setTestCaseWatch={setTestCaseWatch}
            />
          </div>

          <div className="submition">
            <div className="testings">
              <p
                className={testCaseWatch ? "active" : ""}
                onClick={() => {
                  setTestCaseWatch(true);
                  setRunTimeWatch(false);
                }}
              >
                Testcase
              </p>
              <p
                className={runTimeWatch ? "active" : ""}
                onClick={() => {
                  setRunTimeWatch(true);
                  setTestCaseWatch(false);
                }}
              >
                Run time
              </p>
            </div>

            <div className={`case-blocktest ${testCaseWatch ? "active" : ""}`}>
              <div className="case-list">
                {filteredCases.length > 0 ? (
                  filteredCases.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveCaseId(item.id)}
                      className={`case ${
                        activeCaseId === item.id ? "active" : ""
                      }`}
                    >
                      <p>case {idx + 1}</p>
                    </div>
                  ))
                ) : (
                  <p>No test cases found</p>
                )}
              </div>

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

            <div className={`output-box ${runTimeWatch ? "active" : ""}`}>
              <p>{output || "No output yet"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodePanels;
