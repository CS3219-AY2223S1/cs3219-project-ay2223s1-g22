// Config file for environments

var environments = {};

environments.development = {
  envName: "development",
  matchingServiceUrl: "http://matching-service:8081",
  userServiceUrl: "http://user-service:8082/api/firebaseauth",
  collaborationServiceUrl: "ws://localhost:8083",
};

environments.production = {
  envName: "production",
  matchingServiceUrl: "https://matching-service-pzsuad4zva-as.a.run.app:443",
  userServiceUrl:
    "https://user-service-pzsuad4zva-as.a.run.app/api/firebaseauth",
  collaborationServiceUrl: "pending-deployment",
};

environments.test = {
  envName: "test",
  matchingServiceUrl: "http://matching-service:8081",
  userServiceUrl: "http://user-service:8082/api/firebaseauth",
  collaborationServiceUrl: "ws://localhost:8083",
};

var currEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "";

// Export the environment
var environmentToExport =
  typeof environments[currEnvironment] == "object"
    ? environments[currEnvironment]
    : environments.dev;
export default environmentToExport;