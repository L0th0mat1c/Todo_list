import mongoose, { Schema } from "mongoose";
import Task from "./schemas/task";

export const enums = {
  statuses: ["Todo", "Pending", "Close"],
  types: ["Personal", "Professional", "Spare-time", "Urgent"],
};

const Todo = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  type: {
    type: String,
    required: false,
    default: enums.types[0],
    enum: enums.types,
  },
  status: {
    type: String,
    required: false,
    default: enums.statuses[0],
    enum: enums.statuses,
  },
  user_id: { type: "ObjectId", required: true },
  tasks: [{ type: new Schema(Task) }],
});

export default mongoose.model("Todo", Todo);
