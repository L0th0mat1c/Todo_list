import React, { useContext } from "react";
import AddTodoForm from "./AddTodoForm/AddTodoForm";
import { Divider, Row, Col } from "antd";
import { TodoContext } from "../../contexts/TodoContext";
import { ITodo, TodoContextType } from "src/@types/todo";
import CardTodoComponent from "src/components/CardTodoComponent";

const Home = () => {
  const { todos, loading, changeStatusTodo } = useContext(
    TodoContext
  ) as TodoContextType;

  return (
    <div>
      <AddTodoForm />
      <Divider />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {todos.map(({ id, title, description, status }: ITodo) => (
          <Col className="gutter-row" span={6}>
            <CardTodoComponent
              id={id}
              title={title}
              description={description}
              status={status}
              loading={loading}
              checkOnClick={() => changeStatusTodo(id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
