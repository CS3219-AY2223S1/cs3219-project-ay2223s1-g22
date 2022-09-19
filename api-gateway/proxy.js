import { createProxyMiddleware } from "http-proxy-middleware";
import { HTTP_ROUTES, WEBSOCKET_ROUTES } from "./routes.js";

export const setupHttpProxies = (app) => {
  HTTP_ROUTES.forEach((r) => {
    app.use(createProxyMiddleware(r.url, r.proxy));
  });
};

export const setupWebSocketProxies = (app) => {
  const wsProxies = [];

  WEBSOCKET_ROUTES.forEach((r) => {
    const wsProxy = createProxyMiddleware(r.proxy);
    app.use(wsProxy);
    wsProxies.push(wsProxy);
  });

  return wsProxies;
};

export const authenticateWebSocketProxies = (server, wsProxies) => {
  wsProxies.forEach((p) => {
    server.on("upgrade", (req, socket, head) => {
      if (isAuthenticated(req)) {
        p.upgrade(req, socket, head);
      } else {
        // reject connection request if not authenticated
        socket.destroy();
      }
    });
  });
};

const isAuthenticated = (req) => {
  // TODO: replace dummy validation logic with actual JWT token
  return req.headers.token && req.headers.token === "abc";
};
