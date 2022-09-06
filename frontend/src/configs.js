const USER_SERVICE_DOMAIN =
  process.env.USER_SERVICE_DOMAIN || "http://localhost:8000";
const USER_SERVICE_PREFIX = "/api/user";

const MATCHING_SERVICE_DOMAIN =
  process.env.MATCHING_SERVICE_DOMAIN || "http://localhost:8080";

export const USER_SERVICE_URL = USER_SERVICE_DOMAIN + USER_SERVICE_PREFIX;

/* TODO: figure out a way to toggle between env variables in local and production */
// export const MATCHING_SERVICE_URL = MATCHING_SERVICE_DOMAIN;
export const MATCHING_SERVICE_URL =
    "http://localhost:8080";
  // "https://matching-service-pzsuad4zva-as.a.run.app:443/";
