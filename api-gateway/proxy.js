import { createProxyMiddleware } from "http-proxy-middleware";
import axios from "axios";
import { parse } from "url";

import {
  UNAUTHENTICATED_HTTP_ROUTES,
  AUTHENTICATED_HTTP_ROUTES,
  USER_SERVICE_URL,
  MATCHING_SERVICE_URL,
  COLLABORATION_SERVICE_URL,
} from "./routes.js";

export const setupHttpProxies = (app) => {
  UNAUTHENTICATED_HTTP_ROUTES.forEach((r) => {
    const proxy = createProxyMiddleware(r.url, r.proxy);
    app.use(proxy);
  });

  AUTHENTICATED_HTTP_ROUTES.forEach((r) => {
    const proxy = createProxyMiddleware(r.url, r.proxy);
    app.use(checkAuthentication, proxy);
  });
};

export const setupWebSocketProxies = (server) => {
  server.on("upgrade", async (request, socket, head) => {
    const matchingServiceProxy = createProxyMiddleware({
      target: MATCHING_SERVICE_URL,
      ws: true,
      changeOrigin: false,
      pathRewrite: { [`^/get-match`]: "/socket.io" },
    });

    const collaborationServiceProxy = createProxyMiddleware({
      target: COLLABORATION_SERVICE_URL,
      changeOrigin: false,
      pathRewrite: { [`^/setup-editor-sync`]: "" },
    });

    let isAuthenticated = await isAuthenticatedWebSocketRequest(request);

    if (!isAuthenticated) {
      // if the accessToken is not provided or is invalid, reject the websocket proxy request
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
    }

    const { pathname } = parse(request.url);

    console.log(pathname);

    if (pathname == "/get-match/") {
      console.log("proxying to matching service");
      matchingServiceProxy.upgrade(request, socket, head);
    }

    if (pathname == "/setup-editor-sync") {
      console.log("proxying to collaboration service");
      collaborationServiceProxy.upgrade(request, socket, head);
    }
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

const isAuthenticatedWebSocketRequest = async (request) => {
  const accessToken = getAccessTokenFromWebSocketHeader(request);

  if (!accessToken) {
    return false;
  }

  let isValid = false;
  await isValidAccessToken(accessToken).then((val) => (isValid = val));

  return isValid;
};

const getAccessTokenFromWebSocketHeader = (request) => {
  if (
    !request.headers["authorization"] &&
    !request.headers["sec-websocket-protocol"]
  ) {
    console.log("No access token found!");
    return null;
  }

  if (request.headers["authorization"]) {
    const authHeader = request.headers["authorization"];

    const split = authHeader.split(" ");

    if (split.length !== 2) {
      return false;
    }

    const accessToken = split[1];

    return accessToken;
  } else {
    // TODO: maybe find a better way to send the accessToken through websocket; maybe send it as the first message?

    // get the accessToken from request.headers["sec-websocket-protocol"]
    const accessToken = request.headers["sec-websocket-protocol"];

    return accessToken;
  }
};

const isValidAccessToken = async (accessToken) => {
  const TOKEN_VALIDATION_URL = USER_SERVICE_URL + "/authenticate";

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
