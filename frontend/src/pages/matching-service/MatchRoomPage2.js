import {Button, Flex, HStack, useToast, Grid, GridItem } from "@chakra-ui/react";
import {useContext, useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import Chat from "../chat";
import Question from "../../components/Question"
import CodeEditor from "../../components/CodeEditor"
import { SocketContext } from "./SocketContext";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'

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
      console.info(`socket ${socket.id} is still connected, sending leave match.`);
      onClose()
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
    })
  }

  useEffect(() => {
    socket.on("match-over", (message) => {
      console.log(`got match over event from server: socket -> ${socket.id}`);
      showOpponentLeftToast();
    })
    return () => {
      socket.off("match-over");
    }
  }, []);

  return (
    <Grid
      h='100vh'
      templateRows='repeat(10, 1fr)'
      templateColumns='repeat(6, 1fr)'
      gap={4}
      >
      <GridItem rowSpan={1} colSpan={6}>
        <NavBar/>
      </GridItem>
      <GridItem rowSpan={5} colSpan={2} border='2px' borderRadius='10' borderColor='blackAlpha.300'>
        <Question/>
      </GridItem>
      <GridItem rowSpan={4} colSpan={2} rowStart={7} border='2px' borderRadius='10' borderColor='blackAlpha.300'>
        <Chat/>
      </GridItem>
      <GridItem rowSpan={7} colSpan={4}>
        <CodeEditor/>
      </GridItem>
      <GridItem rowSpan={2} colSpan={4} bg='green.400'>
        Terminal
      </GridItem>
    </Grid>
    // <Flex direction="column">
    //   <NavBar />
    //   <Chat roomNumber={roomNumber} />
    //   <AlertDialog
    //       isOpen={isOpen}
    //       leastDestructiveRef={cancelRef}
    //       onClose={onClose}
    //       isCentered={true}
    //   >
    //     <AlertDialogOverlay>
    //       <AlertDialogContent>
    //         <AlertDialogHeader fontSize='lg' fontWeight='bold'>
    //           Leave match
    //         </AlertDialogHeader>

    //         <AlertDialogBody>
    //           {socket.connected && "Are you sure you want to leave your peer hanging?"}
    //           {!socket.connected && "Are you sure you want to leave the match?"}
    //         </AlertDialogBody>

    //         <AlertDialogFooter>
    //           <Button ref={cancelRef} onClick={onClose}>
    //             Cancel
    //           </Button>
    //           <Button colorScheme='red' onClick={handleLeaveMatch} ml={3}>
    //             Leave
    //           </Button>
    //         </AlertDialogFooter>
    //       </AlertDialogContent>
    //     </AlertDialogOverlay>
    //   </AlertDialog>
    //   <HStack justifyContent="flex-end">
    //     <Button colorScheme="red" onClick={openLeaveDialog}>
    //       Leave Match
    //     </Button>
    //   </HStack>
    // </Flex>
  );
};

export default MatchRoomPage;
