import logger from "./logger";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

const HOST = process.env["HOST_DB_GATEWAY"];
const PORT = process.env["PORT_DB_GATEWAY"];
const DATA = process.env["DATA_DB_GATEWAY"];
const DB_URL = process.env["DB_URL_GATEWAY"] || "";

const uri = `mongodb://${HOST}:${PORT}/${DATA}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 50,
  wtimeoutMS: 2500,
};

mongoose.set("strictQuery", true);

export const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(DB_URL || uri, options)
      .then(() => {
        logger.info("Connected to database");
      })
      .catch((err) => logger.error(`error: ${err}`));
  }
};

export const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collectio) =>
      mongoose.connection.collection(collectio).deleteMany({})
    );

    await Promise.all(promises);
  }
};

export const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      logger.info("Disconnected to database");
    } catch (error) {
      logger.warn(`error disconnect: ${error}`);
    }
  }
};
const database = {
  connect,
  truncate,
  disconnect,
};

export default database;
