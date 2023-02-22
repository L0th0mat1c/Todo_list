import React, { useContext, useEffect } from "react";
import { Card } from "antd";
import { TodoContext } from "../../contexts/TodoContext";
import { TodoContextType } from "src/@types/todo";
import { useParams } from "react-router-dom";
import UpdateTodoForm from "./UpdateTodoForm";

const TodoUpdate = () => {
  const { todoSelected, getTodo } = useContext(TodoContext) as TodoContextType;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        await getTodo(id);
      })();
    }
  }, [id]);

  return (
    <Card title="Update this Todo">
      {todoSelected && <UpdateTodoForm data={todoSelected} />}
    </Card>
  );
};

export default TodoUpdate;
