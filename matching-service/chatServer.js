import { Server } from "socket.io";

export function initializeServer(httpServer) {
    const chatServerIo = new Server(httpServer, {
        cors: { origin: "*" }
    });
    chatServerIo.on('connection', (socket) => {
        console.info(`user ${ socket } connected`);
        socket.on('send', (message, room) => {
            console.info("sending message to room " + room);
            socket.join(room);
            socket.emit('receive', message);
        })
    })
    return chatServerIo;
}

