export const MATCHING_SERVICE_CLOUD_RUN_URL =
  "https://matching-service-pzsuad4zva-as.a.run.app:443";
export const USER_SERVICE_CLOUD_RUN_URL =
  "https://user-service-pzsuad4zva-as.a.run.app" + "/api" + "/firebaseauth";

export const HTTP_ROUTES = [
  {
    auth: false,
    url: "/signup",
    proxy: {
      target: USER_SERVICE_CLOUD_RUN_URL + "/signup",
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
      target: USER_SERVICE_CLOUD_RUN_URL + "/login",
      changeOrigin: true,
      pathRewrite: {
        [`^/login`]: "",
      },
    },
  },
  {
    auth: false,
    url: "/refreshToken",
    proxy: {
      target: USER_SERVICE_CLOUD_RUN_URL + "/refreshToken",
      changeOrigin: true,
      pathRewrite: {
        [`^/refreshToken`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/authenticate",
    proxy: {
      target: USER_SERVICE_CLOUD_RUN_URL + "/authenticate",
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
      target: USER_SERVICE_CLOUD_RUN_URL + "/getuser",
      changeOrigin: true,
      pathRewrite: {
        [`^/getuser`]: "",
      },
    },
  },
  {
    auth: true,
    url: "/logout",
    proxy: {
      target: USER_SERVICE_CLOUD_RUN_URL + "/revokeRefreshToken",
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
      target: USER_SERVICE_CLOUD_RUN_URL + "/deleteuser",
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
      target: MATCHING_SERVICE_CLOUD_RUN_URL,
      ws: true,
      changeOrigin: true,
      pathRewrite: { [`^/get-match`]: "/socket.io" },
    },
  },
];
