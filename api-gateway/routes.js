import config from "./config.js";

export const MATCHING_SERVICE_URL = config.matchingServiceUrl;
export const USER_SERVICE_URL = config.userServiceUrl;

export const UNAUTHENTICATED_HTTP_ROUTES = [
  {
    auth: false,
    url: "/signup",
    proxy: {
      target: USER_SERVICE_URL + "/signup",
      changeOrigin: true,
      pathRewrite: {
        [`^/signup`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/login",
    proxy: {
      target: USER_SERVICE_URL + "/login",
      changeOrigin: true,
      pathRewrite: {
        [`^/login`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/health-matching-service",
    proxy: {
      target: MATCHING_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/health-matching-service`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/refreshToken",
    proxy: {
      target: USER_SERVICE_URL + "/refreshToken",
      changeOrigin: true,
      pathRewrite: {
        [`^/refreshToken`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/sendEmailVerification",
    proxy: {
      target: USER_SERVICE_URL + "/sendEmailVerification",
      changeOrigin: true,
      pathRewrite: {
        [`^/sendEmailVerification`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/authenticate",
    proxy: {
      target: USER_SERVICE_URL + "/authenticate",
      changeOrigin: true,
      pathRewrite: {
        [`^/authenticate`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/getuser",
    proxy: {
      target: USER_SERVICE_URL + "/getuser",
      changeOrigin: true,
      pathRewrite: {
        [`^/getuser`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/logout",
    proxy: {
      target: USER_SERVICE_URL + "/revokeRefreshToken",
      changeOrigin: true,
      pathRewrite: {
        [`^/logout`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/resetpassword",
    proxy: {
      target: USER_SERVICE_URL + "/resetpassword",
      changeOrigin: true,
      pathRewrite: {
        [`^/resetpassword`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/deleteuser",
    proxy: {
      target: USER_SERVICE_URL + "/deleteuser",
      changeOrigin: true,
      pathRewrite: {
        [`^/deleteuser`]: "",
      },
    },
  },
];

export const AUTHENTICATED_HTTP_ROUTES = [
  {
    auth: true,
    url: "/authenticate",
    proxy: {
      target: USER_SERVICE_URL + "/authenticate",
      changeOrigin: true,
      pathRewrite: {
        [`^/authenticate`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/getuser",
    proxy: {
      target: USER_SERVICE_URL + "/getuser",
      changeOrigin: true,
      pathRewrite: {
        [`^/getuser`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/logout",
    proxy: {
      target: USER_SERVICE_URL + "/revokeRefreshToken",
      changeOrigin: true,
      pathRewrite: {
        [`^/logout`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/deleteuser",
    proxy: {
      target: USER_SERVICE_URL + "/deleteuser",
      changeOrigin: true,
      pathRewrite: {
        [`^/deleteuser`]: "",
      },
    },
  },
];

export const WEBSOCKET_ROUTES = [
  {
    auth: true,
    url: "/get-match",
    proxy: {
      target: MATCHING_SERVICE_URL,
      ws: true,
      changeOrigin: true,
      pathRewrite: { [`^/get-match`]: "/socket.io" },
    },
  },
];
