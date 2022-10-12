/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import { Select, VStack, Box, HStack, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";

import { API_GATEWAY_WEBSOCKET_URL } from "../config/configs";
import "./Editor.css";

function CodeEditor({ roomNumber, accessToken }) {
  const ydocRef = useRef(null);
  const editorRef = useRef(null);
  const providerRef = useRef(null);
  const bindingRef = useRef(null);

  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [isConnected, setIsConnected] = useState(false);
  const [isEditorMounted, setIsEditorMounted] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    if (isEditorMounted) {
      ydocRef.current = setupYDoc();
      providerRef.current = setupWsProvider();

      setupMonacoBinding();
    }
  }, [isEditorMounted]);

  const setupYDoc = () => {
    return new Y.Doc();
  };

  const setupWsProvider = () => {
    if (providerRef.current) {
      return;
    }

    const URL = API_GATEWAY_WEBSOCKET_URL + "/setup-editor-sync";

    const wsProvider = new WebsocketProvider(URL, roomNumber, ydocRef.current, {
      params: {
        accessToken: accessToken,
      },
    });

    wsProvider.on("status", (statusUpdate) => {
      const status = statusUpdate.status;
      setIsConnected(status === "connected");

      console.log(`connection status: ${statusUpdate.status}`);
    });

    wsProvider.on("sync", (isSynced) => {
      setIsSynced(isSynced);

      console.log(`isSynced: ${isSynced}`);
    });

    wsProvider.on("error", (error) => {
      console.log(error);
    });

    return wsProvider;
  };

  const setupMonacoBinding = () => {
    if (bindingRef.current) {
      return;
    }

    bindingRef.current = new MonacoBinding(
      ydocRef.current.getText("monaco"),
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      providerRef.current.awareness
    );
  };

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
    setIsEditorMounted(true);
  };

  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
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
