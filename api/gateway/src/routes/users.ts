import express, { Request, Response } from "express";

import User from "../models/user";
// import checkJWT from "../middlewares/security";
const router = express.Router();

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().lean();

    return res.json({ success: true, users });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getUser = async ({ params }: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: params["id"] }).lean();

    return res.json({ success: true, user });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createUser = async ({ body }: Request, res: Response) => {
  try {
    const newUser = new User(body);
    await newUser.save();
    const user = await User.findOne({ _id: newUser._id });

    if (user === null) {
      return res.json({ success: false, id: null });
    }

    return res.json({ success: true, id: user._id });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateUser = async ({ params, body }: Request, res: Response) => {
  try {
    await User.updateOne({ _id: params["id"] }, body);

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteUser = async ({ params }: Request, res: Response) => {
  try {
    await User.deleteOne({ _id: params["id"] });

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json(e);
  }
};

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
