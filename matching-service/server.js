import {Server} from "socket.io";

const difficulty = {
    easy: [],
    medium: [],
    hard: []
}

export function queueSocket(socket, level) {
    console.info(`socket ${ socket.id } added to ${ level } queue.`)
    difficulty[level].push(socket);
}

export function checkQueue(level) {
    console.info(`checking ${ level } queue`)
    return !difficulty[level].length;
}

export function makeRoom(server, socket, level) {
    const socket1 = difficulty[level].shift();
    console.info(`making room for sockets:\n ${ socket.id } and ${ socket1.id }`)
    const room = socket.id.concat(socket1.id);
    const sockets = [socket, socket1];
    sockets.map((sock) => {
        sock.join(room)
    })
    server.to(room).emit('room-number', room);
}
