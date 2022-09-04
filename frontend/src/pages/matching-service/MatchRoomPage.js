import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import Chat from "../chat";
import { SocketContext } from "./SocketContext";

const MatchRoomPage = () => {
  const roomNumber = useLocation().state;
  const navigate = useNavigate();
  const { sendLeaveMatch } = useContext(SocketContext);

  const handleLeaveMatch = () => {
    sendLeaveMatch(roomNumber);
    navigate("/matchselection");
  };

  return (
    <Flex direction="column">
      <NavBar />
      <Chat />

      <HStack justifyContent="flex-end">
        <Text color="green.300">{`Room Number: ${roomNumber}`}</Text>
        <Button colorScheme="red" onClick={handleLeaveMatch}>
          Leave Match
        </Button>
      </HStack>
    </Flex>
  );
};

export default MatchRoomPage;
