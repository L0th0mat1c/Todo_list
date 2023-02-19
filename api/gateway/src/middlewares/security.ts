import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { NextFunction, Request, Response } from "express";

const TOKEN_KEY = process.env["SESSION_SECRET"] || "";

const checkJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  try {
    let token: string | string[] =
      req.headers["x-access-token"] || req.headers["authorization"] || "";

    if (!!token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, TOKEN_KEY, async (err, decoded) => {
        if (err) {
          logger.error("Invalid token");

          return res.status(401).json("Token not valid");
        } else {
          req.decoded = decoded;

          if (req.url === "/users") {
            if (decoded.role !== "ADMIN") {
              logger.error("Unauthorized, only Admin can access !");

              return res
                .status(401)
                .json("Unauthorized, only Admin can access !");
            }
          }

          const expiresIn = 24 * 60 * 60;
          const newToken = jwt.sign(
            {
              user: decoded.user,
            },
            TOKEN_KEY,
            {
              expiresIn: expiresIn,
            }
          );

          res.header("Authorization", "Bearer " + newToken);

          next();
        }
      });
    } else {
      logger.error("Unauthorized: Token is required");

      return res.status(401).json("Token required");
    }
  } catch (error) {
    logger.error("ERROR Server");

    return res.status(404).json("Bad requset");
  }
};

export default checkJWT;
