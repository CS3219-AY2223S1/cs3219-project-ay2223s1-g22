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
  rejoinSocket, cancelQueue, checkIfSocketInRoom, addSocketsToInRoom, removeSocketFromInRoom,
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
  console.info(`socket ${socket.id} connected`);

  socket.on("user-id", (userId, username) => {
    addUser(server, socket, userId, username);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
    if (socket.username) {
      const roomNumber = checkIfSocketInRoom(socket);
      if (roomNumber) {
        socket.leave(roomNumber);
        removeSocketFromInRoom(socket);
        socket.to(roomNumber).emit("buddy-check", false);
      }
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

  socket.on("enter-room", (room) => {
    socket.join(room);
    socket.to(room).emit("buddy-check", true, room);
    addSocketsToInRoom([socket], room);
  })

  socket.on("exit-room", (room) => {
    socket.leave(room);
    removeSocketFromInRoom(socket);
    socket.to(room).emit("buddy-check", false);
  })

  socket.on("cancel-queue", () => {
    cancelQueue(socket);
  });
});

const PORT = config?.portToListenOn || 8080;

httpServer.listen(PORT, () => {
  console.log(`HTTP server started at port: ${PORT}`);
});

export default app;
