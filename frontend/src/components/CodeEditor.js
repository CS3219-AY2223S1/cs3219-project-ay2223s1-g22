import React, { useEffect, useState, useRef } from "react";
import "./Editor.css";

function CodeEditor() {
  const [programmingLanguage, setProgrammingLanguage] = useState("text/x-java");
  const dbRef = useRef(null);
  const codeMirrorRef = useRef(null);
  const firepadRef = useRef(null);

  useEffect(() => {
    //// Initialize Firebase.
    // firebase configuration details here
    const config = {
      apiKey: "AIzaSyCxYyuY2qWbab4z8U0zxy3PgyEVtVYMrGk",
      authDomain: "cs3219-project-ay2223s1-g22.firebaseapp.com",
      databaseURL: "https://cs3219-project-ay2223s1-g22.firebaseio.com/",
      projectId: "cs3219-project-ay2223s1-g22",
      storageBucket: "cs3219-project-ay2223s1-g22.appspot.com",
      messagingSenderId: "733243007424",
      appId: "1:733243007424:web:ebec765f20de1a1d81e825",
      measurementId: "G-FTQMLTKRB8",
    };

    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(config);

      //// Get Firebase Database reference.
      dbRef.current = createRoom();
    }

    //// Create CodeMirror editor.
    if (!codeMirrorRef.current) {
      codeMirrorRef.current = window.CodeMirror(
        document.getElementById("firepad-container"),
        {
          lineNumbers: true,
          theme: "material",
          mode: programmingLanguage,
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          lineWrapping: true,
          matchBrackets: true,
          autofocus: true,
        }
      );
    }

    //// Create Firepad
    firepadRef.current = window.Firepad.fromCodeMirror(
      dbRef.current,
      codeMirrorRef.current,
      {
        defaultText: "Type some stuff here!",
        userId: "2",
      }
    );

    firepadRef.current.on("ready", () => {
      console.log("Firepad is ready");
    });
  }, []);

  // change syntax highlighting
  useEffect(() => {
    codeMirrorRef.current.setOption("mode", programmingLanguage);
  }, [programmingLanguage]);

  // Helper function to create a room based on some pre-determined string (perhaps two users?)
  function createRoom() {
    var ref = window.firebase.database().ref();
    var hash = "peer01";
    ref = ref.child(hash);
    if (typeof console !== "undefined") {
      console.log("Firebase data: ", ref.toString());
    }
    return ref;
  }

  return (
    <div>
      <div>
        <form>
          <label>
            Language:
            <select
              value={programmingLanguage}
              onChange={(e) => setProgrammingLanguage(e.target.value)}
            >
              <option value="text/x-java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="some-language-that-doesn't-exist">
                Turn off syntax highlighting
              </option>
            </select>
          </label>
        </form>
      </div>
      <div id="firepad-container"></div>
    </div>
  );
}
export default CodeEditor;
