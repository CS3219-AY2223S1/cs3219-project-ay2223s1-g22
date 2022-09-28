import { Button } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { SocketContext } from "./SocketContext";
import UserContext from "../../UserContext";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const LeaveRoomOverlay = (props) => {
  const { idToken } = useContext(UserContext);
  const { getSocket, sendLeaveMatch } = useContext(SocketContext);
  const socketRef = useRef(getSocket(idToken));
  const cancelRef = useRef();
  const onClose = () => {
    props.toggleOverlay(false);
  };
  const roomNumber = useLocation().state;
  const navigate = useNavigate();

  const handleLeaveMatch = () => {
    const socket = socketRef.current;

    if (socket) {
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
    }
  };

  return (
    <AlertDialog
      isOpen={props.isVisible}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Leave match
          </AlertDialogHeader>

          <AlertDialogBody>
            {socketRef.current &&
              socketRef.current.connected &&
              "Are you sure you want to leave your peer hanging?"}
            {socketRef.current &&
              !socketRef.current.connected &&
              "Are you sure you want to leave the match?"}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleLeaveMatch} ml={3}>
              Leave
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default LeaveRoomOverlay;
