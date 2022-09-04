import { createContext } from "react";
import io from "socket.io-client";

const MATCHING_SERVICE_URL = "http://localhost:8080";

const socket = io(MATCHING_SERVICE_URL);

export const SocketContext = createContext({
  socket: socket,
});
