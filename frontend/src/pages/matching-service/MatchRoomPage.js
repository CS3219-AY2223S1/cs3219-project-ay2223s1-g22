import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import {useContext, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import Chat from "../chat";
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
  const onClose = () => setIsOpen(false);


  const handleLeaveMatch = () => {
    setIsOpen(true);
    sendLeaveMatch(roomNumber);
    console.log("left match");
    // navigate("/matchselection");
  };

  return (
    <Flex direction="column">
      <NavBar />
      <Chat roomNumber={roomNumber} />
      {/*<AlertDialog*/}
      {/*    isOpen={isOpen}*/}
      {/*    leastDestructiveRef={cancelRef}*/}
      {/*    onClose={onClose}*/}
      {/*>*/}
      {/*  <AlertDialogOverlay>*/}
      {/*    <AlertDialogContent>*/}
      {/*      <AlertDialogHeader fontSize='lg' fontWeight='bold'>*/}
      {/*        Delete Customer*/}
      {/*      </AlertDialogHeader>*/}

      {/*      <AlertDialogBody>*/}
      {/*        Are you sure? You can't undo this action afterwards.*/}
      {/*      </AlertDialogBody>*/}

      {/*      <AlertDialogFooter>*/}
      {/*        <Button ref={cancelRef} onClick={onClose}>*/}
      {/*          Cancel*/}
      {/*        </Button>*/}
      {/*        <Button colorScheme='red' onClick={onClose} ml={3}>*/}
      {/*          Delete*/}
      {/*        </Button>*/}
      {/*      </AlertDialogFooter>*/}
      {/*    </AlertDialogContent>*/}
      {/*  </AlertDialogOverlay>*/}
      {/*</AlertDialog>*/}
      <HStack justifyContent="flex-end">
        <Button colorScheme="red" onClick={handleLeaveMatch}>
          Leave Match
        </Button>
      </HStack>
    </Flex>
  );
};

export default MatchRoomPage;
