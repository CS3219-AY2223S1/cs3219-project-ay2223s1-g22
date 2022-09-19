import express from "express";

import {
  setupHttpProxies,
  setupWebSocketProxy,
  authenticateWebSocketConnectionRequests,
} from "./proxy.js";

const app = express();
const port = 3000;

app.get("/health", (req, res) => {
  return res.send("API Gateway is up!");
});

setupHttpProxies(app);
const wsProxy = setupWebSocketProxy(app);

const server = app.listen(port, () => {
  console.log(`API Gateway is listening at port: ${port}`);
});

authenticateWebSocketConnectionRequests(server, wsProxy);

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
