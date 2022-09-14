/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  ButtonGroup,
  VStack,
} from "@chakra-ui/react";

import UserContext from "../UserContext";

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

function CodeEditor({ roomNumber }) {
  const [programmingLanguage, setProgrammingLanguage] = useState("text/x-java");
  const [dbCreated, setDbCreated] = useState(false);

  const dbRef = useRef(null);
  const codeMirrorRef = useRef(null);
  const firepadRef = useRef(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    /* Initialize Firebase */
    if (!Firebase.apps.length) {
      // initialize the firebase app
      Firebase.initializeApp(config);
    }

    if (!dbRef.current) {
      // create a table that stores the code-editor data for the current match
      dbRef.current = createRoom();

      setDbCreated(true);
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
  }, []);

  useEffect(() => {
    /* Create Firepad instance */
    const userId = getUserEmail(user);

    // TODO: remove this alert
    if (codeMirrorRef.current === null) {
      alert("codeMirrorRef is null");
    }

    if (
      firepadRef.current === null &&
      dbRef.current !== null &&
      codeMirrorRef.current !== null
    ) {
      firepadRef.current = Firepad.fromCodeMirror(
        dbRef.current,
        codeMirrorRef.current,
        {
          userId: userId,
        }
      );

      firepadRef.current.on("ready", () => {
        console.log("Firepad is ready");
      });
    }
  }, [dbCreated, user]);

  /* To change syntax highlighting. */
  useEffect(() => {
    codeMirrorRef.current.setOption("mode", programmingLanguage);
  }, [programmingLanguage]);

  //// Helper Functions
  /* Create a new database table to hold the data in the code editor for this match */
  function createRoom() {
    // get a reference to the firebase realtime database
    var ref = Firebase.database().ref();

    // create a new "table" in the database with the roomId as the name
    var roomId = roomNumber || "peer01";
    ref = ref.child(roomId);

    // print data in the table (for debugging purposes)
    // if (typeof console !== "undefined") {
    //   console.log("Firebase data: ", ref.toString());
    // }
    // test
    return ref;
  }

  /* Get code from the editor */
  function getCode() {
    if (!firepadRef.current) {
      console.log("Firepad not initialized!");
      return;
    }

    const code = firepadRef.current.getText();

    return code;
  }

  /* Get username of logged-in user from email */
  function getUserEmail(user) {
    if (!user || !user.email) {
      return "default-user";
    }

    const email = user.email;
    // TODO: move the logic of obtaining the username from the email
    // to somewhere more suitable
    const username = email.split("@")[0];

    // remove restricted characters from username
    // TODO: find a better way to remove ALL dots from a string
    const splitUsernameByDotsList = username.split(".");
    const usernameWithoutDots = splitUsernameByDotsList.join("");

    const filteredUsername = usernameWithoutDots
      .replace("#", "")
      .replace("$", "")
      .replace("[", "")
      .replace("]", "");

    return filteredUsername;
  }

  return (
    <VStack h="100%" w="100%">
      <FormControl>
        <FormLabel>Language:</FormLabel>
        <Select onChange={(e) => setProgrammingLanguage(e.target.value)}>
          <option value="text/x-java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="some-language-that-doesn't-exist">
            Turn off syntax highlighting
          </option>
        </Select>
      </FormControl>
      <Box h="100%" w="100%">
        <div id="firepad-container"></div>
      </Box>
      <ButtonGroup justifyContent="flex-end" width="100%">
        <Button onClick={() => alert(getCode())}>Test</Button>
      </ButtonGroup>
    </VStack>
  );
}
export default CodeEditor;
