import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {

  return (
    <div className="code-boxs">
      <h2>Python kod muhiti</h2>
      <Editor
        width="100%"
        height="400px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
