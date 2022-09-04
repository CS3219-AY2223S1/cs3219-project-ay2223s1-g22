import { createContext } from "react";
import io from "socket.io-client";

const MATCHING_SERVICE_URL = "http://localhost:8080";

let socket = io(MATCHING_SERVICE_URL);

const sendLevel = (difficulty) => {
  socket.emit("level", difficulty);
};

const sendLeaveMatch = (roomNumber) => {
  socket.emit("leave-match", roomNumber);
};

export const SocketContext = createContext({
  socket: socket,
  sendLevel: sendLevel,
  sendLeaveMatch: sendLeaveMatch,
});
