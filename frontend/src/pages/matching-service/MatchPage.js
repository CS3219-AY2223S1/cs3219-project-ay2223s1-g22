import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import { SocketContext } from "./SocketContext";

function MatchPage() {
  const roomNumber = useLocation().state;
  const navigate = useNavigate();
  const { sendLeaveMatch } = useContext(SocketContext);

  const handleLeaveMatch = () => {
    sendLeaveMatch(roomNumber);
    navigate("/matchselection");
  };

  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <NavBar />

      <VStack spacing={5}>
        <Heading color="yellow.300">Match Page (Work-in-Progress)</Heading>
        <Text color="green.300">{`Room Number: ${roomNumber}`}</Text>
        <Button colorScheme="red" onClick={handleLeaveMatch}>
          Leave Match
        </Button>
      </VStack>
    </Flex>
  );
}

export default MatchPage;
