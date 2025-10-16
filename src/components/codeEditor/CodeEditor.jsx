import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { baseUrl } from "../../pages/services/config";
import { getToken } from "../../pages/services/token";

export default function CodeEditor({ codeBy, setCodeBy, profil }) {
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python"); // default Python

  const getCreateSubmition = async () => {
    try {
      const response = await fetch(`${baseUrl}/submissions/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          user: profil?.id, // yoki login qilgan foydalanuvchi ID
          problem: codeBy?.problem, // tanlangan masala ID
          code: codeBy, // editordagi kod
          language: language,
        }),
      });

      const result = await response.json();
      console.log(result);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(error);
      setOutput("Xatolik yuz berdi");
    }
  };

  return (
    <div className="code-boxs">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        <option value="python">Python</option>
        {/* <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option> */}
        {/* kerak bo‘lsa boshqa tillar qo‘shish mumkin */}
      </select>
      <Editor
        width="100%"
        height="400px"
        defaultLanguage="python"
        theme="vs-dark"
        value={codeBy}
        onChange={(value) => setCodeBy(value)}
      />
      <button onClick={getCreateSubmition} className="run-btn">
        Submit
      </button>
      <pre className="output-box">{output}</pre>
    </div>
  );
}
