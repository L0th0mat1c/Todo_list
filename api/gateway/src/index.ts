/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from "express";
import { config } from "dotenv";
import session from "express-session";
import { rateLimit } from "express-rate-limit";
import responseTime from "response-time";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morganMiddleware from "./middlewares/morgan.middleware";
import logger from "./utils/logger";
import { connect } from "./utils/db";
import swaggerUI from "swagger-ui-express";
import swaggerDef from "./utils/swagger.json";
import about from "./utils/about.json";
import fs from "fs";
import path from "path";
import urls from "./utils/urls";
import { createProxyMiddleware } from "http-proxy-middleware";

config();

const port = process.env["PORT"] || 8000;
const baseUrl = process.env["BASE_URL"] || "http://localhost";
const secret = process.env["SESSION_SECRET"] || "";
const store = new session.MemoryStore();

type User = {
  id: string;
  email: string;
};

declare module "express-session" {
  interface SessionData {
    user?: User;
    authenticated: boolean;
    cookie: Cookie;
  }
}
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

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

urls.forEach(({ route_name, url }) => {
  const options = {
    target: url,
    changeOrigin: true,
    logger: console,
  };
  const proxy = createProxyMiddleware(options);
  app.use(`/${route_name}`, proxy);
});

const basePath = path.join(__dirname, "../../gateway/src/routes");

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

app.get("/", (_req: Request, res: Response) => {
  res.send(about);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDef));

app.listen(port, () => {
  logger.info(`Server running at ${baseUrl}:${port}`);
});
