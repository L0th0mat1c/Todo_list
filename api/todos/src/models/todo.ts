import mongoose, { Schema } from "mongoose";
import Task from "./schemas/task";

const Todo = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: Boolean,
    default: false,
  },
  created_date: { type: Date },
  user_id: { type: "ObjectId", required: false },
  tasks: [{ type: new Schema(Task) }],
});

export default mongoose.model("Todo", Todo);
