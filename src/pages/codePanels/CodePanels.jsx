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

function CodePanels() {
  const { slug } = useParams();

  const [details, setDetails] = useState(null);

  const [index, setIndex] = useState(null);
  const [code, setCode] = useState("");
  const [testCase, setTestCase] = useState(null);

  useEffect(() => {
    // 1. Barcha masalalarni olish
    getProblems()?.then((list) => {
      // slug bo‘yicha topish
      const foundIndex = list.findIndex((item) => item.slug === slug);
      if (foundIndex !== -1) setIndex(foundIndex + 1);
    });

    // 2. Shu masalaning tafsilotini olish
    getProblemsDetails(slug)?.then((data) => {
      setDetails(data);
    });
  }, [slug]);

  useEffect(() => {
    getMasala(details?.id)?.then(setCode);
    getTestCase()?.then(setTestCase);
  }, [details]);

  return (
    <>
      <div className="codePanels">
        <div className="container">
          <div className="coding">
            <p className="coding-titles">
              <span>{index}.</span>
              {details?.title}
            </p>
            <p className="leveles">
              <span>{details?.difficulty}</span>
              <span>Maslahat</span>
            </p>
            <p>{details?.description}</p>
            <p>{details?.input_example}</p>
            <p>{details?.output_example}</p>
          </div>
          <div className="submitions-borders">
            <CodeEditor
              code={code?.template_code}
              setCode={setCode}
              // setCode={(newCode) =>
              //   setCode({ ...code, template_code: newCode })
              // }
            />
            <div className="  ">
              {testCase?.map((item) => {
                return (
                  code?.problem === item?.problem && (
                    <div className="testCase-contents" key={item?.id}>
                      <p>{item?.input_data}</p>
                      <p>{item?.expected_output}</p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodePanels;
