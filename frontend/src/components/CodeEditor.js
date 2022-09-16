/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Box,
  FormControl,
  Select,
  Button,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";

import UserContext from "../UserContext";

import "./Editor.css";

// note: these are external dependencies that are
//    imported via <script> tags in public/index.html
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
  const [isFirepadSynced, setIsFirepadSynced] = useState(null);

  const dbRef = useRef(null);
  const codeMirrorRef = useRef(null);
  const firepadRef = useRef(null);

  const { user } = useContext(UserContext);

  // Initialize firebase, database, editor and firepad on initial render
  useEffect(() => {
    /* Initialize firebase */
    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }

    /* Initialize realtime database */
    if (!dbRef.current) {
      // create a table that stores the code-editor data for the current match
      dbRef.current = createRoom();
    }

    /* Initialize codemirror editor instance */
    if (!codeMirrorRef.current) {
      codeMirrorRef.current = createEditor(programmingLanguage);
    }

    /* Initialize firepad */
    if (!firepadRef.current) {
      firepadRef.current = initializeFirepad();
    }
  }, []);

  // Update syntax highlighting settings in the editor when user selects
  //    a different programming language
  useEffect(() => {
    codeMirrorRef.current.setOption("mode", programmingLanguage);
  }, [programmingLanguage]);

  /* ======== Helper Functions ================================================================================*/
  /* Create a new database table to hold the data in the code editor for this match */
  function createRoom() {
    // get a reference to the firebase realtime database
    var ref = Firebase.database().ref();

    // create a new "table" in the database with the roomId as the name
    var roomId = roomNumber || "peer01";
    ref = ref.child(roomId);

    return ref;
  }

  function createEditor(programmingLanguage) {
    const divEl = document.getElementById("firepad-container");

    const EDITOR_SETTINGS = {
      theme: "material",
      mode: programmingLanguage,
      lineNumbers: true,
      indentWithTabs: true,
      smartIndent: true,
      lineWrapping: true,
      matchBrackets: true,
      autofocus: true,
    };

    return CodeMirror(divEl, EDITOR_SETTINGS);
  }

  function initializeFirepad() {
    const userId = getFilteredUsernameFromEmail(user);

    const firePadInstance = Firepad.fromCodeMirror(
      dbRef.current,
      codeMirrorRef.current,
      {
        userId: userId,
      }
    );

    firePadInstance.on("ready", () => {
      console.log("Firepad is ready");
    });

    firePadInstance.on("synced", (isSynced) => {
      setIsFirepadSynced(isSynced);
    });

    return firePadInstance;
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
  function getFilteredUsernameFromEmail(user) {
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
    <VStack h="100%" w="100%" p="2">
      <Box h="100%" w="100%">
        <div id="firepad-container"></div>
      </Box>
      <HStack w="100%">
        <FormControl>
          <Select onChange={(e) => setProgrammingLanguage(e.target.value)}>
            <option value="text/x-java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="some-language-that-doesn't-exist">
              Turn off syntax highlighting
            </option>
          </Select>
        </FormControl>
        <HStack justifyContent="flex-end" width="100%">
          {isFirepadSynced !== null && (
            <HStack p={3}>
              {isFirepadSynced ? (
                <>
                  <Heading as="h5" size="sm" color="white">
                    Changes saved
                  </Heading>
                  <CheckCircleIcon color="green.300" />
                </>
              ) : (
                <>
                  <Heading as="h5" size="sm" color="white">
                    Saving your changes
                  </Heading>
                  <WarningTwoIcon color="orange.300" />
                </>
              )}
            </HStack>
          )}
          <Button onClick={() => alert(getCode())}>Run</Button>
        </HStack>
      </HStack>
    </VStack>
  );
}
export default CodeEditor;
