import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  isQueueEmpty,
  queueSocket,
  makeRoom,
  alreadyInQueueOrRoom,
  addUser,
  rejoinSocket, cancelQueue, checkIfSocketInRoom,
} from "./server.js";
import config from "./config.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hey there from matching-service");
});

const httpServer = createServer(app);

const server = new Server(httpServer, {
  cors: { origin: true },
}).on("connection", (socket) => {
  console.info(`user ${socket.id} connected`);

  socket.on("user-id", (userId, username) => {
    addUser(server, socket, userId, username);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    const roomNumber = checkIfSocketInRoom(socket);
    if (roomNumber) {
      server.in(roomNumber).emit("match-over");
    }
  })

  socket.on("rejoin-room", (roomNum) => {
    rejoinSocket(server, socket, roomNum);
  });

  socket.on("level", (level, callback) => {
    if (!alreadyInQueueOrRoom(socket)) {
      if (isQueueEmpty(server, level)) {
          queueSocket(socket, level);
          if (typeof callback === "function") {
            callback(false);
          }
      } else {
        makeRoom(server, socket, level);
      }
    } else {
      if (typeof callback == "function") {
        callback(true);
      }
      // socket.emit("already-queued", "You are already in queue");
    }
  });

  socket.on("send", (message, room) => {
    console.info("sending message to room " + room);
    socket.to(room).emit("receive", message);
  });

  socket.on("leave-match", (room) => {
    console.info(`Evicting ${socket["uuid"]} from room: ${room}`);
    server.in(room).emit("match-over");
    socket.disconnect();
  });

  socket.on("cancel-queue", () => {
    cancelQueue(socket)
  })
});

const PORT = config?.port || 8080;

httpServer.listen(PORT, () => {
  console.log(`HTTP server started at port: ${PORT}`);
});

export default app;
