/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import { config } from "dotenv";
import { rateLimit } from "express-rate-limit";
import responseTime from "response-time";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morganMiddleware from "./middlewares/morgan.middleware";
import logger from "./utils/logger";
import { connect } from "./utils/db";
import fs from "fs";
import path from "path";

config();

const port = process.env["PORT"] || 8000;
const baseUrl = process.env["BASE_URL"] || "http://localhost";

connect();

const app = express();

app.use(
  cors({ origin: "*", credentials: true, exposedHeaders: ["set-cookie"] })
);
app.use(helmet());
app.use(responseTime());
app.use(morganMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 calls
  })
);

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
