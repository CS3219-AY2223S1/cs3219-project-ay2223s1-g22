import { createContext } from "react";
import io from "socket.io-client";

import { MATCHING_SERVICE_URL } from "../../config/configs";

let socket = io("172.25.97.19:8080");

const sendLevel = (difficulty) => {
  socket.emit("level", difficulty);
};

const sendLeaveMatch = (roomNumber) => {
  socket.emit("leave-match", roomNumber);
  socket.disconnect();
  socket.connect();
};

export const SocketContext = createContext({
  socket: socket,
  sendLevel: sendLevel,
  sendLeaveMatch: sendLeaveMatch,
});
