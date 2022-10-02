/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import { Select, VStack, Box, HStack, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";

import "./Editor.css";

function CodeEditor({ roomNumber }) {
  const ydocRef = useRef(null);
  const editorRef = useRef(null);
  const providerRef = useRef(null);

  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [isConnected, setIsConnected] = useState("pending");
  const [isSynced, setIsSynced] = useState(false);

  const COLLABORATION_WEBSOCKET_URL = "ws://localhost:1234";

  useEffect(() => {
    if (editorRef.current) {
      ydocRef.current = setupYDoc();
      providerRef.current = setupWsProvider();

      setupMonacoBinding();
    }
  }, [editorRef]);

  const setupYDoc = () => {
    return new Y.Doc();
  };

  const setupWsProvider = () => {
    const wsProvider = new WebsocketProvider(
      COLLABORATION_WEBSOCKET_URL,
      roomNumber,
      ydocRef.current
    );

    wsProvider.on("status", (statusUpdate) => {
      const status = statusUpdate.status;
      setIsConnected(status === "connected");

      console.log(`connection status: ${statusUpdate.status}`);
    });

    wsProvider.on("sync", (isSynced) => {
      setIsSynced(isSynced);

      console.log(`isSynced: ${isSynced}`);
    });

    return wsProvider;
  };

  const setupMonacoBinding = () => {
    new MonacoBinding(
      ydocRef.current.getText("monaco"),
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      providerRef.current.awareness
    );
  };

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <VStack p="2" h="100%" w="100%">
      <Box h="100%" w="100%">
        <MonacoEditor
          language={programmingLanguage}
          theme="vs-dark"
          options={options}
          editorDidMount={editorDidMount}
        />
      </Box>

      <HStack w="100%">
        <Select onChange={(e) => setProgrammingLanguage(e.target.value)}>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </Select>
        <HStack justifyContent="flex-end" width="100%">
          <HStack p={3}>
            {isSynced ? (
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
        </HStack>
      </HStack>
    </VStack>
  );
}
export default CodeEditor;
