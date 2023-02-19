/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import { config } from "dotenv";
import responseTime from "response-time";
import morganMiddleware from "./middlewares/morgan.middleware";
import logger from "./utils/logger";
import bodyParser from "body-parser";
import { connect } from "./utils/db";
import cors from "cors";
import fs from "fs";
import path from "path";

config();

const port = process.env["PORT_TODOS"] || 8001;
const baseUrl = process.env["BASE_URL_TODOS"] || "http://localhost";

connect();

const app = express();

app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

app.use(responseTime());
app.use(morganMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const basePath = path.join(__dirname, "../../todos/src/routes");

fs.readdir(basePath, (_err, files) => {
  try {
    files.forEach((file) => {
      app.use("/", require("./routes/" + file));
    });
    logger.info("Router initialized");
  } catch (err) {
    logger.error(`ERROR on routes:  ${err}`);
  }
});

app.listen(port, () => {
  logger.info(`Server running at ${baseUrl}:${port}`);
});
