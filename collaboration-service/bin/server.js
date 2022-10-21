#!/usr/bin/env node

/**
 * @type {any}
 */
const WebSocket = require("ws");
const http = require("http");
const url = require("url");
const wss = new WebSocket.Server({ noServer: true });
const setupWSConnection = require("./utils.js").setupWSConnection;

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  // const { pathname } = url.parse(request.url);
  // console.log(pathname);

  // You may check auth of request here..
  // See https://github.com/websockets/ws#client-authentication
  /**
   * @param {any} ws
   */
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`);
});

/*

eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGVlcnByZXAtZWFjZWUiLCJhdWQiOiJwZWVycHJlcC1lYWNlZSIsImF1dGhfdGltZSI6MTY2NTEzMjQwMCwidXNlcl9pZCI6IjQ2TjNFYVdkZEZic0ZSUFlXY01HR1h3OUxSczIiLCJzdWIiOiI0Nk4zRWFXZGRGYnNGUlBZV2NNR0dYdzlMUnMyIiwiaWF0IjoxNjY1MTMyNDAwLCJleHAiOjE2NjUxMzYwMDAsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Yet6px63N5nfxUrFX0lhnEubMmrTm1eM45mcqTZzTE_srSop3sfLBr0A0I5-7DlBYl6vf7QxvH1DppB-sbikxgLtX3YzL_odjgAZfSqIgOKC5RWQGWmB5UZoqKyfgzJqfMn3lL8ODCI0s-8s7YeacFjzTbObw0Bmo4bITr0-UIDiaRrgbo7aCEke8tyXSaVv4FrbCR1XDvnYIbV7xR_F7TRkeXYtNtMpkAkblr1bh7_K9kh028fxfHBlUOjg8aC5Nzk7xLi-WqfzxkBvUTz93Qyz_uE9ea8Yw0zmzintx5s8KBID344ycwW94iE2F_r-gxT1KFwG84GPFrnl4DSNJg

*/
