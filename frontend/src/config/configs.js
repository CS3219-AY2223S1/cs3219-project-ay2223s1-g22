// URL for User Service endpoint
const USER_SERVICE_DOMAIN =
	"http://localhost:8080" || process.env.REACT_APP_USER_SERVICE_DOMAIN;
const USER_SERVICE_PREFIX = "/api/firebaseauth";
export const USER_SERVICE_URL = USER_SERVICE_DOMAIN + USER_SERVICE_PREFIX;

// URL for Matching Service endpoint
const MATCHING_SERVICE_DOMAIN =
	process.env.REACT_APP_MATCHING_SERVICE_DOMAIN || "http://localhost:8080";
export const MATCHING_SERVICE_URL = MATCHING_SERVICE_DOMAIN;
