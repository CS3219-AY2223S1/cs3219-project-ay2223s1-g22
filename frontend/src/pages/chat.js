import { Flex, Stack, Box, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../components/chat/Divider";
import Footer from "../components/chat/Footer";
import Header from "../components/chat/Header";
import Messages from "../components/chat/Messages";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "cs3219 rox" },
    {
      from: "computer",
      text:
        "You can send me message and i'll reply you with same message."
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };

  return (
    <Flex
        w="100%"
        h="100%" 
        justify="flex-start" 
        align='center'
        >
      <Stack>
        <Flex 
          h="100%" 
          flexDir="column" 
          backgroundColor='whiteAlpha.100'
          borderRadius='10'>
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
          h="100%" 
          flexDir="column" 
          backgroundColor='whiteAlpha.100'
          borderRadius='10'>
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
      <VStack w='100%'>
        <Box bg='whiteAlpha.300' w='100%' p={4}>
          This will be the code editor + output terminal
        </Box>
        <Box bg='whiteAlpha.300' w='100%' p={4}>
          This will be the code editor + output terminal
        </Box>
        <Box bg='whiteAlpha.300' w='100%' p={4}>
          This will be the code editor + output terminal
        </Box>
        <Box bg='whiteAlpha.300' w='100%' p={4}>
          This will be the code editor + output terminal
        </Box>
      </VStack>
    </Flex>
  );
};

export default Chat;
