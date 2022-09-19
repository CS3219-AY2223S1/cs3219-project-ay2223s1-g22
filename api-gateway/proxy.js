import { createProxyMiddleware } from "http-proxy-middleware";
import { MATCHING_SERVICE_CLOUD_RUN_URL, ROUTES } from "./routes.js";

export const setupHttpProxies = (app) => {
  ROUTES.forEach((r) => {
    app.use(createProxyMiddleware(r.url, r.proxy));
  });
};

export const setupWebSocketProxy = (app) => {
  const wsProxy = createProxyMiddleware({
    target: MATCHING_SERVICE_CLOUD_RUN_URL,
    ws: true,
    changeOrigin: true,
    pathRewrite: { [`^/get-match`]: "socket.io" },
  });

  app.use(wsProxy);

  return wsProxy;
};

export const authenticateWebSocketConnectionRequests = (server, wsProxy) => {
  server.on("upgrade", (req, socket, head) => {
    // TODO: replace dummy validation logic with actual JWT token
    if (!req.headers.token || req.headers.token !== "abc") {
      socket.destroy();
      return;
    }

    wsProxy.upgrade(req, socket, head);
  });
};
