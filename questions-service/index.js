import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
  createQuestion,
  getQuestion,
} from "./controller/question-controller.js";
import config from "./config/config.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Controller will contain all the User-defined Routes
const router = express.Router();
app.get("/", (_, res) => res.send("Hello World from questions-service"));
app.post("/api/questions", (req, res) => createQuestion(req, res));
app.get("/api/questions/:difficulty", (req, res) => getQuestion(req, res));

app.use("/api/questions", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

const PORT = config.port || 8084;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
