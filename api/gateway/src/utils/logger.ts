import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

const myCustomLevels = {
  levels: {
    info: 0,
    error: 1,
    fatal: 2,
  },
  colors: {
    info: "white",
    error: "yellow",
    fatal: "red",
  },
};

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
const logger = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
    colorize(),
    timestamp({ format: "DD-MM-YY HH:mm:ss" }),
    myFormat
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
//   const { format } = winston;
//   logger.add(
//     const consoleLogger =
//   );
// }
export default logger;
