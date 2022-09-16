import { useToast, Grid, GridItem, Text, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import Chat from "../Chat";
import Question from "../../components/Question";
import CodeEditor from "../../components/CodeEditor";
import { SocketContext } from "./SocketContext";

const MatchRoomPage = () => {
  const roomNumber = useLocation().state;
  const navigate = useNavigate();
  const { sendLeaveMatch } = useContext(SocketContext);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const { socket } = useContext(SocketContext);

  const onClose = () => setIsOpen(false);

  const openLeaveDialog = () => setIsOpen(true);

  const handleLeaveMatch = () => {
    if (socket.connected) {
      console.info(
        `socket ${socket.id} is still connected, sending leave match.`
      );
      onClose();
      sendLeaveMatch(roomNumber);
    } else {
      socket.connect();
    }
    navigate("/matchselection");
  };

  const opponentLeftToast = useToast();
  const showOpponentLeftToast = () => {
    opponentLeftToast({
      title: "Oops! You opponent left the match!",
      description: "You can continue working on the problem though :)",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    socket.on("match-over", (message) => {
      console.log(`got match over event from server: socket -> ${socket.id}`);
      showOpponentLeftToast();
    });
    return () => {
      socket.off("match-over");
    };
  }, []);

  return (
    <Grid
      h="100vh"
      templateRows="repeat(10, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={6}>
        <NavBar />
      </GridItem>
      <GridItem
        rowSpan={5}
        colSpan={2}
        marginLeft={2}
        marginBottom={2}
        border="2px"
        borderRadius="10"
        borderColor="blackAlpha.300"
      >
        <Question />
      </GridItem>
      <GridItem
        rowSpan={4}
        colSpan={2}
        rowStart={7}
        marginLeft={2}
        marginBottom={2}
        border="2px"
        borderRadius="10"
        borderColor="blackAlpha.300"
      >
        <Chat roomNumber={roomNumber} />
      </GridItem>
      <GridItem
        rowSpan={10}
        colSpan={4}
        marginBottom={2}
        border="2px"
        borderRadius="10"
        borderColor="blackAlpha.300"
        backgroundColor="linkedin.700"
      >
        <CodeEditor roomNumber={roomNumber} />
      </GridItem>
    </Grid>
  );
};

export default MatchRoomPage;
