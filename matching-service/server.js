import {Server} from "socket.io";

const difficulty = {
    easy: [],
    medium: [],
    hard: []
}

const users = {};


export function addUser(server, socket, userId) {
        console.info(`adding user: ${userId} to connected map.`);
    if (!users[`${userId}`]) {
        console.info(`added user: ${userId}`);
        users[`${userId}`] = socket;
    } else if (users[`${userId}`].connected) {
        console.info(`user: ${userId} is already connected!`);
        server.to(socket.id).emit("connection-error", "You are already connected!");
    } else {
        console.info(`added user: ${userId}`);
        users[`${userId}`] = socket;
    }
}

export function rejoinSocket(server, socket, roomNum) {
    socket.join(roomNum);
}

export function queueSocket(socket, level) {
    console.info(`socket ${ socket.id } added to ${ level } queue.`)
    difficulty[level].push(socket);
}

export function isQueueEmpty(server, level) {
    console.info(`checking ${ level } queue`)
    let nextSocket = difficulty[level][0];
    while(difficulty[level].length) {
        if (nextSocket["connected"]) {
            return false;
        }
        console.info(`removing disconnected socket ${ nextSocket.id }`);
        difficulty[level].shift();
        nextSocket = difficulty[level][0];
    }
    return true;
}

export function alreadyInQueue(socket, level) {
    return difficulty[level].filter(sock => {
        console.log("checking if already in queue")
        console.log(sock.id);
        return sock.id == socket.id;
    }).length;
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
