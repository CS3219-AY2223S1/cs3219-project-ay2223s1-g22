import { createProxyMiddleware } from "http-proxy-middleware";
import axios from "axios";
import { parse } from "url";

import {
  UNAUTHENTICATED_HTTP_ROUTES,
  AUTHENTICATED_HTTP_ROUTES,
  USER_SERVICE_URL,
} from "./routes.js";

export const setupHttpProxies = (app) => {
  UNAUTHENTICATED_HTTP_ROUTES.forEach((r) => {
    const proxy = createProxyMiddleware(r.proxy);
    app.use(r.url, proxy);
  });

  AUTHENTICATED_HTTP_ROUTES.forEach((r) => {
    const proxy = createProxyMiddleware(r.proxy);
    app.use(r.url, checkAuthentication, proxy);
  });
};

export const setupWebSocketProxies = (
  server,
  matchingServiceProxy,
  collaborationServiceProxy
) => {
  server.on("upgrade", async (request, socket, head) => {
    let isAuthenticated = await isAuthenticatedWebSocketRequest(request);

    if (!isAuthenticated) {
      // if the accessToken is not provided or is invalid, reject the websocket proxy request
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
    }

    const { pathname } = parse(request.url);

    console.log(pathname);

    if (pathname.includes("/get-match")) {
      console.log("proxying to matching service");
      matchingServiceProxy.upgrade(request, socket, head);
    }

    if (pathname.includes("/setup-editor-sync")) {
      console.log("proxying to collaboration service");
      collaborationServiceProxy.upgrade(request, socket, head);
    }
  });
};

const checkAuthentication = async (req, res, next) => {
  // this header will have the format 'Bearer <ACCESS_TOKEN>'
  const authHeader = req.headers["authorization"];

  console.log(authHeader);

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
  const accessToken = getAccessTokenFromQueryParams(request);

  if (!accessToken) {
    return false;
  }

  let isValid = false;
  await isValidAccessToken(accessToken).then((val) => (isValid = val));

  return isValid;
};

const getAccessTokenFromQueryParams = (request) => {
  const queryParams = parse(request.url, true).query;
  const accessToken = queryParams.accessToken;

  if (!accessToken) {
    console.log("No access token found in query params!");
    return null;
  }

  return accessToken;
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
