import {Flex, Stack, Box, VStack, useToast} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import Divider from "../components/chat/Divider";
import Footer from "../components/chat/Footer";
import Header from "../components/chat/Header";
import Messages from "../components/chat/Messages";
import { SocketContext } from "./matching-service/SocketContext";
import { useNavigate } from "react-router-dom";

function Chat({ roomNumber }) {
  const [messages, setMessages] = useState([
    {
      from: "matching_service",
      text: "Welcome everyone!",
    },
    {
      from: "matching_service",
      text: `Your room number is: ${roomNumber}`,
    },
    {
      from: "matching_service",
      text: "Have fun!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      // setIsConnected(true);
    });

    socket.on("disconnect", () => {
      // setIsConnected(false);
      // socket.connect();
    });

    socket.on("receive", (message) => {
      setMessages((old) => [
        ...old,
        { from: "PLACEHOLDER_USERNAME", text: message },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive");
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    sendChatMessage(data);

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");
  };

  const sendChatMessage = (chatMessage) => {
    socket.emit("send", chatMessage, roomNumber);
  };

  return (
    <Flex w="100%" h="100%" justify="flex-start" align="center">
      <Stack>
        <Flex //TODO: Change this to question.js and contain both question and chat as a stack
          h="50vh"
          flexDir="column"
          backgroundColor="whiteAlpha.500"
          borderRadius="10"
        >
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
          <Box>QUESTION BOX</Box>
        </Flex>
        <Flex
          h="40vh"
          flexDir="column"
          backgroundColor="whiteAlpha.100"
          borderRadius="10"
        >
          <Header />
          <Divider />
          <Messages messages={messages} />
          <Divider />
          <Footer
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
        </Flex>
      </Stack>
      <VStack w="100%">
        <Box bg="whiteAlpha.300" w="100%" p={4}>
          This will be the code editor + output terminal
        </Box>
        <Box bg="whiteAlpha.300" w="100%" p={4}>
          This will be the code editor + output terminal
        </Box>
        <Box bg="whiteAlpha.300" w="100%" p={4}>
          This will be the code editor + output terminal
        </Box>
        <Box bg="whiteAlpha.300" w="100%" p={4}>
          This will be the code editor + output terminal
        </Box>
      </VStack>
    </Flex>
  );
}

export default Chat;
