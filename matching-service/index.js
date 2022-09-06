import express from "express";
import cors from "cors";
import { createServer } from "http";
import {Server} from "socket.io";
import {isQueueEmpty, queueSocket, makeRoom, alreadyInQueue} from "./server.js";

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
  cors: { origin: true }
  }).on('connection', (socket) => {
    console.info(`user ${ socket.id } connected`);

    socket.on('level', (level) => {
      if (!alreadyInQueue(socket, level)) {
        if (isQueueEmpty(server, level)) {
          if (!alreadyInQueue(socket, level)) {
            queueSocket(socket, level);
          }
        } else {
          makeRoom(server, socket, level);
        }
      }
    })

    socket.on('send', (message, room) => {
      console.info("sending message to room " + room);
      socket.to(room).emit('receive', message);
    })

    socket.on('leave-match', (room) => {
      console.info(`Evicting room: ${ room }`);
      server.in(room).emit('match-over', "Your match has ended.");
      server.in(room).disconnectSockets();
    })
  });


const PORT = 8080;

httpServer.listen(8080, () => {
  console.log(`HTTP server started at port: ${PORT}`);
});

export default app;
