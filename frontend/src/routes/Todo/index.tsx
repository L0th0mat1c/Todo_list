import React, { useContext, useEffect } from "react";
// import AddTodoForm from "./AddTodoForm/AddTodoForm";
import { Divider, Row, Col, Button, Collapse, Card } from "antd";
import { TodoContext } from "../../contexts/TodoContext";
import { ITodo, TodoContextType } from "src/@types/todo";
import { useParams } from "react-router-dom";
import UpdateTodoForm from "./UpdateTodoForm";
// import CardTodoComponent from "src/components/CardTodoComponent";
// import { UnorderedListOutlined } from "@ant-design/icons";
// import CollapseTodoComponent from "src/components/CollapseTodoComponent";

const TodoUpdate = () => {
  const { todoSelected, getTodo } = useContext(TodoContext) as TodoContextType;
  console.log(todoSelected);
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
