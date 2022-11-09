import config from "./config.js";

export const MATCHING_SERVICE_URL = config.matchingServiceUrl;
export const USER_SERVICE_URL = config.userServiceUrl;
export const COLLABORATION_SERVICE_URL = config.collaborationServiceUrl;

export const UNAUTHENTICATED_HTTP_ROUTES = [
  {
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
    url: "/getname",
    proxy: {
      target: USER_SERVICE_URL + "/getname",
      changeOrigin: true,
      pathRewrite: {
        [`^/getname`]: "",
      },
    },
  },
  {
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
    url: "/health-matching-service",
    proxy: {
      target: MATCHING_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/health-matching-service`]: "",
      },
    },
  },
];

export const AUTHENTICATED_HTTP_ROUTES = [
  {
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
