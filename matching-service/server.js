import axios from "axios";
import config from "./config.js";

const difficulty = {
  easy: [],
  medium: [],
  hard: [],
};

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
  console.info(`${socket["username"]} added to ${level} queue.`);
  difficulty[level].push(socket);
  console.log(`${level} queue after add :${difficulty[level].map(sock => sock.username)}`);
}

export function cancelQueue(socket) {
  const keyList = Object.keys(difficulty);
  for (let i = 0; i < keyList.length; i++) {
    const currKey = keyList[i];
    const currList = difficulty[currKey];
    difficulty[currKey] = currList.filter(
      (sock) => sock != socket && sock.connected
    );
    console.log(`after cancel event ${currKey} queue: ${difficulty[currKey]}`);
  }
}

export function isQueueEmpty(server, level) {
  console.info(`checking ${level} queue`);
  let nextSocket = difficulty[level][0];
  while (difficulty[level].length) {
    if (nextSocket["connected"]) {
      return false;
    }
    console.info(`removing disconnected socket ${nextSocket.id}`);
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
        console.log(`${currKey} queue before filter : ${difficulty[currKey]?.map(x => x["username"]).toString()}`);
        difficulty[currKey] = difficulty[currKey].filter(sock => sock.connected);
        console.log(`${currKey} queue after filter : ${difficulty[currKey]?.map(x => x["username"]).toString()}`);
        const currLevelList = difficulty[currKey].map(sock => sock.uuid);
        isInSomeQueue = isInSomeQueue || currLevelList?.includes(socket.uuid);
    }
    console.log(`checked if already in queue: ${isInSomeQueue} or room: ${checkIfSocketInRoom(socket)}`);
    return isInSomeQueue || checkIfSocketInRoom(socket);
}

export function checkIfSocketInRoom(socket) {
    return inRoom[socket.username];
}

export function addSocketsToInRoom(sockets, room) {
    console.log(`adding users ${sockets.map(socket => socket.username)} to inRoom`);
    sockets.map(sock => inRoom[sock.username] = room);
}

export function removeSocketFromInRoom(socket) {
    delete inRoom[socket.username];
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
            server.to(room).emit('room-number', room, res.data, sockets.map(sock => sock["uuid"]));
        }).catch(err => {
            console.log(err);
            server.to(room).emit("question-error", err);
        })
}

async function getRandomQuestion(level) {
  const url = config.questionsServiceUrl;
  return axios.get(`${url}/questions/${level}`) || "easy";
}
