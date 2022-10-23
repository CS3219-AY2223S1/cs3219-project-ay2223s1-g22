// Config file for environments

var environments = {};

environments.development = {
  questionsServiceUrl: "http://questions-service:8084/api",
  portToListenOn: 8081,
};

environments.production = {
  questionsServiceUrl: "https://questions-service-pzsuad4zva-as.a.run.app/api",
  portToListenOn: 8080,
};

environments.test = {
  questionsServiceUrl: "http://questions-service:8084/api",
  portToListenOn: 8081,
};

var currEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "";

// Export the environment
var environmentToExport =
  typeof environments[currEnvironment] == "object"
    ? environments[currEnvironment]
    : environments.development;
export default environmentToExport;
