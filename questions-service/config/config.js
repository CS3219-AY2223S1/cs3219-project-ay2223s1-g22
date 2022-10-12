// Config file for environments

var environments = {};

environments.development = {
  port: 8084,
  dbUrl:
    "mongodb+srv://cs3219mongoatlas:mongomongoDB@cluster0.l5fbhyp.mongodb.net/?retryWrites=true&w=majority",
};

environments.production = {
  port: 8080,
  dbUrl:
    "mongodb+srv://cs3219mongoatlas:mongomongoDB@cluster0.l5fbhyp.mongodb.net/?retryWrites=true&w=majority",
};

environments.test = {
  port: 8084,
  dbUrl:
    "mongodb+srv://cs3219mongoatlas:mongomongoDB@cluster0.l5fbhyp.mongodb.net/?retryWrites=true&w=majority",
};

var currEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "";

// Export the environment
var environmentToExport =
  typeof environments[currEnvironment] == "object"
    ? environments[currEnvironment]
    : environments.dev;
export default environmentToExport;
