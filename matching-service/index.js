import express from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeServer} from "./chatServer.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello World from matching-service");
});

const httpServer = createServer(app);

const PORT = 8080;

const chatServerIo = initializeServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`HTTP server started at port: ${PORT}`);
});

export default app;
