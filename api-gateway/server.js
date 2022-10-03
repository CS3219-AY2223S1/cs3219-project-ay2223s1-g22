import express from "express";
import cors from "cors";

import {
  setupHttpProxies,
  setupWebSocketProxies,
  authenticateWebSocketProxies,
} from "./proxy.js";

const app = express();

app.use(cors());

const port = 8080;

// basic health check
app.get("/health-api-gateway", (req, res) => {
  return res.send("API Gateway is up!");
});

// map HTTP routes
setupHttpProxies(app);

// map WebSocket routes
const wsProxies = setupWebSocketProxies(app);

// initialize the server
const server = app.listen(port, () => {
  console.log(`API Gateway is listening at port: ${port}`);
});

// check that connection requests to WebSocket routes
//	contain a valid JWT token before allowing connection
authenticateWebSocketProxies(server, wsProxies);
