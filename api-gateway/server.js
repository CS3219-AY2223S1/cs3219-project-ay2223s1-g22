import express from "express";

import {
  setupHttpProxies,
  setupWebSocketProxies,
  authenticateWebSocketProxies,
} from "./proxy.js";

const app = express();
const port = 3000;

// basic health check
app.get("/health", (req, res) => {
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

/* ============= THIS WORKS ============= */

// var proxyToMatchingService = new httpProxy.createProxyServer({
//   target: "https://matching-service-pzsuad4zva-as.a.run.app",
//   ws: true,
//   changeOrigin: true,
// });

// server.on("upgrade", (req, socket, head) => {
//   console.log(req.headers.token);
//   console.log(ip.address());
//   if (req.headers.token !== "abc") {
//     socket.destroy();
//     return;
//   }

//   proxyToMatchingService.ws(req, socket);
// });
