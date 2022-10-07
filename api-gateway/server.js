import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

import { MATCHING_SERVICE_URL, COLLABORATION_SERVICE_URL } from "./routes.js";
import { setupHttpProxies, setupWebSocketProxies } from "./proxy.js";

const app = express();

app.use(cors());

const port = 8080;

// provide a health check endpoint that responds with HTTP status 200
app.get("/health-api-gateway", (req, res) => {
  return res.send("API Gateway is up!");
});

// map HTTP routes
setupHttpProxies(app);

// map WebSocket routes
// TODO: refactor this code block; move these into the method setupWebsocketProxies(...) if possible
const matchingServiceProxy = createProxyMiddleware({
  target: MATCHING_SERVICE_URL,
  ws: true,
  changeOrigin: true,
  pathRewrite: { [`^/get-match`]: "/socket.io" },
});
const collaborationServiceProxy = createProxyMiddleware({
  target: COLLABORATION_SERVICE_URL,
  ws: true,
  changeOrigin: true,
  pathRewrite: { [`^/setup-editor-sync`]: "" },
});
app.use("/get-match", matchingServiceProxy);
app.use("/setup-editor-sync", collaborationServiceProxy);

// initialize the server
const server = app.listen(port, () => {
  console.log(`API Gateway is listening at port: ${port}`);
});

// manually authenticate WebSocket routes
setupWebSocketProxies(server, matchingServiceProxy, collaborationServiceProxy);
