import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
	<Editor
		theme='dark'
		defaultLanguage="java"
		defaultValue="// some comment"
	/>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<CodeEditor/>, rootElement);
export default CodeEditor;