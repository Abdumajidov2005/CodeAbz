import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { baseUrl } from "../../pages/services/config";
import { getToken } from "../../pages/services/token";
import { getMasala, getProblems, getProfilMe } from "../../pages/services/app";


export default function CodeEditor({
  codeBy,
  setCodeBy,
  profil,
  setProfil,
  setProblemData,
  setOutput,
  setRunTimeWatch,
  setTestCaseWatch,
}) {
  const [language, setLanguage] = useState("python"); // default Python

  useEffect(() => {
    getProfilMe()?.then(setProfil);
    getMasala()?.then(setCodeBy);
  }, []);

  const beforeMount = (monaco) => {
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs", // "vs-dark" ham bo'lishi mumkin
      inherit: false,
      rules: [
        { token: "keyword", foreground: "#FF0000" }, // keyword qizil bo‘lsin
        { token: "string", foreground: "#137613ff" }, // string yashil bo‘lsin
        { token: "comment", foreground: "#2358eaff", fontStyle: "italic" }, // comment kul rang va italic
      ],
      colors: {
        "editor.background": "#FAF8F8", // fon rangi
        "editor.foreground": "#201bbdff", // text rangi
      },
    });
  };

  const getCreateSubmition = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      user: profil?.id,
      problem: codeBy?.problem,
      code: codeBy?.template_code,
      language: language,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/submissions/create/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Accepted") {
          setOutput(`✅ Accepted (${result.execution_time}s)`);
          getProblems()?.then((data) => {
            setProblemData(data);
          });
        } else {
          setOutput(`❌ ${result.status}`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="code-boxs">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        <option value="python">Python</option>
      </select>
     
      <button
        onClick={() => {
          getCreateSubmition();
          setRunTimeWatch(true);
          setTestCaseWatch(false);
        }}
        className="run-btn"
      >
        Submit
      </button>
      <Editor
        width="100%"
        height="400px"
        defaultLanguage={language}
        beforeMount={beforeMount} // 👈 shu yerda theme define qilinadi
        theme="myCustomTheme" //
        value={
          typeof codeBy?.template_code === "string" ? codeBy.template_code : ""
        } // ✅ faqat string
        onChange={(value) => {
          // Monaco `onChange` ba’zan `undefined` qaytaradi
          const safeValue = value || "";
          setCodeBy((prev) => ({ ...prev, template_code: safeValue }));
        }}
        options={{
          colorDecorators: true,
        }}
      />
    </div>
  );
}
