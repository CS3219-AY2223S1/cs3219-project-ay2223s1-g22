import { Button } from "@chakra-ui/react";
import { useEffect, useContext, useRef, useState, } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import { SocketContext } from "./SocketContext";

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react'

const LeaveRoomOverlay = (props) => {

	const { socket, sendLeaveMatch } = useContext(SocketContext);
	const cancelRef = useRef();
	const onClose = () => { 
		props.toggleOverlay(false);
	}
	const roomNumber = useLocation().state;
	const navigate = useNavigate();

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


	return (
		<AlertDialog
			isOpen={props.isVisible}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			isCentered={true}
		>
			<AlertDialogOverlay>
			<AlertDialogContent>
				<AlertDialogHeader fontSize='lg' fontWeight='bold'>
				Leave match
				</AlertDialogHeader>

				<AlertDialogBody>
				{socket.connected && "Are you sure you want to leave your peer hanging?"}
				{!socket.connected && "Are you sure you want to leave the match?"}
				</AlertDialogBody>

				<AlertDialogFooter>
				<Button ref={cancelRef} onClick={onClose}>
					Cancel
				</Button>
				<Button colorScheme='red' onClick={handleLeaveMatch} ml={3}>
					Leave
				</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
	
}

export default LeaveRoomOverlay;