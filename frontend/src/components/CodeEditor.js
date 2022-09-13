import React, { useEffect, useState, useRef } from "react";
import "./Editor.css";

// external dependencies imported via <script> tags in public/index.html
const Firebase = window.firebase;
const CodeMirror = window.CodeMirror;
const Firepad = window.Firepad;

// temporary firebase API key
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

function CodeEditor() {
  const [programmingLanguage, setProgrammingLanguage] = useState("text/x-java");
  const dbRef = useRef(null);
  const codeMirrorRef = useRef(null);
  const firepadRef = useRef(null);

  useEffect(() => {
    /* Initialize Firebase */
    if (!Firebase.apps.length) {
      // initialize the firebase app
      Firebase.initializeApp(config);

      // create a table that stores the code-editor data for the current match
      dbRef.current = createRoom();
    }

    /* Create CodeMirror editor instance */
    if (!codeMirrorRef.current) {
      codeMirrorRef.current = CodeMirror(
        document.getElementById("firepad-container"),
        {
          theme: "material",
          mode: programmingLanguage,
          lineNumbers: true,
          indentWithTabs: true,
          smartIndent: true,
          lineWrapping: true,
          matchBrackets: true,
          autofocus: true,
        }
      );
    }

    /* Create Firepad instance */
    // TODO: remove hardcoded userId and change to user's name
    const userId = "2";
    firepadRef.current = Firepad.fromCodeMirror(
      dbRef.current,
      codeMirrorRef.current,
      {
        defaultText: "Type some stuff here!",
        userId: userId,
      }
    );

    firepadRef.current.on("ready", () => {
      console.log("Firepad is ready");
    });
  }, []);

  /* To change syntax highlighting. */
  useEffect(() => {
    codeMirrorRef.current.setOption("mode", programmingLanguage);
  }, [programmingLanguage]);

  /* Helper function to create a new database table to hold the data in the code editor for this match */
  function createRoom() {
    // get a reference to the firebase realtime database
    var ref = Firebase.database().ref();

    // create a new "table" in the database with the roomId as the name
    // TODO: remove hardcoded roomId and change to room's id
    var roomId = "peer01";
    ref = ref.child(roomId);

    // print data in the table (for debugging purposes)
    // if (typeof console !== "undefined") {
    //   console.log("Firebase data: ", ref.toString());
    // }
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
