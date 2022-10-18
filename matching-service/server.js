import axios from "axios";

const difficulty = {
    easy: [],
    medium: [],
    hard: []
}

let inRoom = {};

export function addUser(server, socket, userId, username) {
    console.info(`added user: ${userId}`);
    socket["uuid"] = userId;
    socket["username"] = username;
    console.log(`added user id to socket ${socket.id} : ${socket["uuid"]}`);
}

export function rejoinSocket(server, socket, roomNum) {
    socket.join(roomNum);
}

export function queueSocket(socket, level) {
    console.info(`socket ${ socket.id } added to ${ level } queue.`)
    difficulty[level].push(socket);
    console.log(`${level} queue after add :${difficulty[level]}`);
}

export function cancelQueue(socket) {
    const keyList = Object.keys(difficulty);
    for (let i = 0; i < keyList.length; i++) {
        const currKey = keyList[i];
        const currList = difficulty[currKey];
        difficulty[currKey] = currList.filter(sock => sock != socket && sock.connected)
        console.log(`after cancel event ${currKey} queue: ${difficulty[currKey]}`)
    }
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

export function alreadyInQueueOrRoom(socket) {
    const keyList = Object.keys(difficulty);
    let isInSomeQueue = false;
    for (let i = 0; i < keyList.length; i++) {
        const currKey = keyList[i];
        console.log(`${currKey} queue before filter : ${difficulty[currKey]?.map(x => x.uuid).toString()}`);
        difficulty[currKey] = difficulty[currKey].filter(sock => sock.connected);
        console.log(`${currKey} queue after filter : ${difficulty[currKey]?.map(x => x.uuid).toString()}`);
        const currLevelList = difficulty[currKey].map(sock => sock.uuid);
        console.log(`checking if user ${socket.uuid} is in ${currLevelList}`);
        isInSomeQueue = isInSomeQueue || currLevelList?.includes(socket.uuid);
    }
    console.log(`checked if already in queue: ${isInSomeQueue}`);
    updateSocketsInRoom();
    return isInSomeQueue || checkIfSocketInRoom(socket);
}

export function checkIfSocketInRoom(socket) {
    return inRoom[socket];
}

function addSocketsToInRoom(sockets, room) {
    console.log(`adding sockets ${sockets.map(socket => socket.uuid)} to inRoom`);
    updateSocketsInRoom();
    sockets.map(sock => inRoom[sock] = room);
}

function updateSocketsInRoom() {
    const socketList = Object.keys(inRoom);
    socketList.map(sock => {
        if (!sock.connected) {
            delete inRoom[sock];
        }
    })
}

export async function makeRoom(server, socket, level) {
    const socket1 = difficulty[level].shift();
    console.info(`making room for sockets:\n ${ socket.id } and ${ socket1.id }`)
    const room = socket.id.concat(socket1.id);
    const sockets = [socket, socket1];
    addSocketsToInRoom(sockets, room);
    sockets.map((sock) => {
        sock.join(room)
    });
    await getRandomQuestion(level)
        .then(res => {
            server.to(room).emit('room-number', room, res.data, sockets.map(sock => sock["username"]));
        }).catch(err => {
            console.log(err);
            server.to(room).emit("question-error", err);
        })
}

async function getRandomQuestion(level) {
    const url = "http://questions-service:8084/api";
    return axios.get(`${url}/questions/${level}`);
}