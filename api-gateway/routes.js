export const MATCHING_SERVICE_CLOUD_RUN_URL =
  "https://matching-service-pzsuad4zva-as.a.run.app:443";
export const USER_SERVICE_CLOUD_RUN_URL =
  "https://user-service-pzsuad4zva-as.a.run.app";

export const ROUTES = [
  {
    auth: true,
    url: "/premium",
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: "",
      },
    },
  },
];
