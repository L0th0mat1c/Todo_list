import express, { Request, Response } from "express";
import bc from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

const router = express.Router();

const loginUser = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (user && (await bc.compare(password, user.password))) {
      const token = jwt.sign(
        { user: user._id, email, role: user.role },
        process.env["SESSION_SECRET"] || "",
        {
          expiresIn: "2h",
        }
      );

      const userToSend = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      res.status(200).json({ success: true, user: { ...userToSend }, token });
    } else {
      logger.error("Invalid Credentials");
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

router.post("/login", loginUser);

module.exports = router;
