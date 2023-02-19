import { Request, Response } from "express";

const app = require("express")();

app.get("/todos", (_req: Request, res: Response) =>
  res.send("Hello Todos, API with MongoDB!")
);

app.listen(8002, () => console.log(`Todos API listening on port 8001!`));
