import { createContext } from "react";
import io from "socket.io-client";

import { API_GATEWAY_URL } from "../../config/configs";

let socket;

const getSocket = (accessToken, uuid) => {
  if (!socket && accessToken) {
    console.log(`init socket because socket is undefined -> ${socket === undefined} 
      or access token is undefined -> ${accessToken === undefined}`)
    socket = initSocket(accessToken);
    console.log(`attaching ${uuid} onto socket ${socket["id"]}`);
    socket["uuid"] = uuid;
  }
  return socket;
};

const initSocket = (accessToken) => {
  return io(API_GATEWAY_URL, {
    path: "/get-match",
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const sendLeaveMatch = (roomNumber) => {
  if (socket) {
    socket.emit("leave-match", roomNumber);
    socket.disconnect();
    socket.connect();
  }
};

const sendUserId = (userId, username) => {
  if (socket) {
    socket.emit("user-id", userId, username);
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
  sendLeaveMatch: sendLeaveMatch,
  sendUserId: sendUserId,
  rejoinRoom: rejoinRoom,
});
