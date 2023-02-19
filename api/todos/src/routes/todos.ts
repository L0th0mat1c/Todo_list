import express, { Request, Response } from "express";
import Todo from "../models/todo";

const router = express.Router();

const getAllTodos = async (_req: Request, res: Response) => {
  console.log("test");
  try {
    const todos = await Todo.find().lean();

    return res.json({ success: true, todos });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getTodo = async ({ params }: Request, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: params["id"] }).lean();

    return res.json({ success: true, todo });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createTodo = async ({ body }: Request, res: Response) => {
  try {
    const newTodo = new Todo(body);
    await newTodo.save();
    const todo = await Todo.findOne({ _id: newTodo._id });

    if (todo === null) {
      return res.json({ success: false, id: null });
    }

    return res.json({ success: true, id: todo._id });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const updateTodo = async ({ params, body }: Request, res: Response) => {
  try {
    await Todo.updateOne({ _id: params["id"] }, body);

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteTodo = async ({ params }: Request, res: Response) => {
  try {
    await Todo.deleteOne({ _id: params["id"] });

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json(e);
  }
};

router.get("/todos", getAllTodos);
router.get("/todos/:id", getTodo);
router.post("/todos", createTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
