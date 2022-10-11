import { createContext } from "react";
import io from "socket.io-client";

import { API_GATEWAY_URL } from "../../config/configs";

let socket;

const getSocket = (accessToken) => {
  if (!socket && accessToken) {
    socket = initSocket(accessToken);
  }

  return socket;
};

const initSocket = (accessToken) => {
  return io(API_GATEWAY_URL, {
    path: "/get-match",
    transports: ["websocket"],
    query: {
      accessToken,
    },
  });
};

const sendLevel = (difficulty) => {
  if (socket) {
    socket.emit("level", difficulty);
  }

  return socket;
};

const sendLeaveMatch = (roomNumber) => {
  if (socket) {
    socket.emit("leave-match", roomNumber);
    socket.disconnect();
    socket.connect();
  }
};

const sendUserId = (userId) => {
  if (socket) {
    socket.emit("user-id", userId);
  }
};

const rejoinRoom = (roomNum) => {
  if (socket) {
    socket.emit("rejoin-room", roomNum);
  }
};

export const SocketContext = createContext({
  getSocket: getSocket,
  initSocket: initSocket,
  sendLevel: sendLevel,
  sendLeaveMatch: sendLeaveMatch,
  sendUserId: sendUserId,
  rejoinRoom: rejoinRoom,
});
