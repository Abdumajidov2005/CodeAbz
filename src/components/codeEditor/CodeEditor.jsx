import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <>
      <div className="code-editor">
        <div className="container">
          <div className="code-boxs">
            <Editor
              height="500px"
              defaultLanguage="python"
              theme="vs-dark"
              options={{
                padding: {top:20},
                fontSize: 16,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                lineNumbers: "on",
                cursorBlinking: "smooth",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
