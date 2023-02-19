import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const saltRound = parseInt(process.env["SALT_ROUND"] || "10", 10);
const hashPassword = (password: string | Buffer) =>
  bcrypt.hashSync(password, saltRound);

const User = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    set: hashPassword,
    select: false,
    scan: false,
    default: "T0d0l1st23$",
  },
  role: { type: String, default: "USER" },
});

export default mongoose.model("User", User);
