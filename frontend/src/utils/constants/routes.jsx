import React from "react";
import Home from "../../routes/Home";
import TodoUpdate from "src/routes/Todo";

export const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/todo/:id",
    component: <TodoUpdate />,
  },
];
