import express from "express";
import cors from "cors";

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

// initialize the server
const server = app.listen(port, () => {
  console.log(`API Gateway is listening at port: ${port}`);
});

// map WebSocket routes
setupWebSocketProxies(server);
