import { createProxyMiddleware } from "http-proxy-middleware";
import {
  HTTP_ROUTES,
  USER_SERVICE_CLOUD_RUN_URL,
  WEBSOCKET_ROUTES,
} from "./routes.js";

import axios from "axios";

export const setupHttpProxies = (app) => {
  HTTP_ROUTES.forEach((r) => {
    const proxy = createProxyMiddleware(r.url, r.proxy);

    if (r.auth) {
      app.use(checkAuthentication, proxy);
    } else {
      app.use(proxy);
    }
  });
};

export const setupWebSocketProxies = (app) => {
  const wsProxies = [];

  WEBSOCKET_ROUTES.forEach((r) => {
    // const wsProxy = createProxyMiddleware(r.proxy);
    const wsProxy = createProxyMiddleware(r.url, r.proxy); // this should be working
    app.use(wsProxy);
    wsProxies.push(wsProxy);
  });

  return wsProxies;
};

export const authenticateWebSocketProxies = (server, wsProxies) => {
  wsProxies.forEach((p) => {
    server.on("upgrade", async (req, socket, head) => {
      let isAuthenticated = await isAuthenticatedWebSocketRequest(req);

      if (isAuthenticated) {
        p.upgrade(req, socket, head);
      } else {
        // reject connection request if not authenticated
        socket.destroy();
      }
    });
  });
};

const checkAuthentication = async (req, res, next) => {
  // this header will have the format 'Bearer <ACCESS_TOKEN>'
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  // get the <ACCESS_TOKEN>
  const accessToken = authHeader.split(" ")[1];

  if (!accessToken || !(await isValidAccessToken(accessToken))) {
    return res.sendStatus(401);
  }

  next();
};

const isAuthenticatedWebSocketRequest = async (req) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return false;
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return false;
  }

  let isValid = false;
  await isValidAccessToken(accessToken).then((val) => (isValid = val));

  return isValid;
};

const isValidAccessToken = async (accessToken) => {
  const TOKEN_VALIDATION_URL = USER_SERVICE_CLOUD_RUN_URL + "/authenticate";

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  let tokenIsValid = false;

  try {
    await axios.get(TOKEN_VALIDATION_URL, config).then((res) => {
      tokenIsValid = true;
    });
  } catch (error) {
    tokenIsValid = false;
  }

  return tokenIsValid;
};
