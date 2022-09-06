import { createContext } from "react";
import io from "socket.io-client";

import { MATCHING_SERVICE_URL } from "../../config/configs";

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
