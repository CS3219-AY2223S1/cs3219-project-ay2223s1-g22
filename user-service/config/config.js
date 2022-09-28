// Config file for environments

var environments = {};

environments.development = {
  port: 8082,
};

environments.production = {
  port: 8080,
};

environments.test = {
  port: 8082,
};

var currEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "";

// Export the environment
var environmentToExport =
  typeof environments[currEnvironment] == "object"
    ? environments[currEnvironment]
    : environments.dev;
export default environmentToExport;
