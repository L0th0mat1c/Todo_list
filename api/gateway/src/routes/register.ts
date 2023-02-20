import express, { Request, Response } from "express";
import User from "../models/user";
import logger from "../utils/logger";

const router = express.Router();

const registerUser = async ({ body }: Request, res: Response) => {
  const { email, password, username } = body;

  try {
    if (!(email && password && username)) {
      return res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const newUser = new User(body);
    await newUser.save();

    const result = await User.findOne({ _id: newUser._id.toString() }).lean();

    if (result === null) {
      return res.json({ success: true, user: null });
    }

    return res.json({ success: true, user: result._id });
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
};

router.post("/register", registerUser);

module.exports = router;
