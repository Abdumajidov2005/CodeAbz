import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Python kod muhiti</h2>
      <Editor
        width="600px"
        height="400px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
