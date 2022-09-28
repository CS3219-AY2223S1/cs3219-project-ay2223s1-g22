import { Flex } from "@chakra-ui/react";
import { useState, useContext, useEffect, useRef } from "react";

import Divider from "../components/chat/Divider";
import Footer from "../components/chat/Footer";
import Header from "../components/chat/Header";
import Messages from "../components/chat/Messages";
import { SocketContext } from "./matching-service/SocketContext";
import UserContext from "../UserContext";

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

  const { idToken } = useContext(UserContext);
  const { getSocket, rejoinRoom } = useContext(SocketContext);
  const socketRef = useRef(getSocket(idToken));

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("connect", () => {
      rejoinRoom(roomNumber);
    });

    socket.on("disconnect", () => {});

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
    socketRef.current.emit("send", chatMessage, roomNumber);
  };

  return (
    <Flex
      h="100%"
      flexDir="column"
      backgroundColor="whiteAlpha.100"
      borderRadius="10"
      padding="2"
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
  );
}

export default Chat;
