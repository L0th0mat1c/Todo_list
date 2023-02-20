import React, { useContext } from "react";
import AddTodoForm from "./AddTodoForm/AddTodoForm";
import { Divider, Row, Col, Button, Collapse } from "antd";
import { TodoContext } from "../../contexts/TodoContext";
import { ITodo, TodoContextType } from "src/@types/todo";
import CardTodoComponent from "src/components/CardTodoComponent";
import { UnorderedListOutlined } from "@ant-design/icons";
import CollapseTodoComponent from "src/components/CollapseTodoComponent";

const Home = () => {
  const {
    todos,
    loading,
    changeStatusTodo,
    setDisplayModeList,
    displayModeList,
    removeTodo,
  } = useContext(TodoContext) as TodoContextType;

  return (
    <div>
      <Row justify="space-between">
        <AddTodoForm />
        <Button
          type={displayModeList ? "primary" : "default"}
          onClick={() => setDisplayModeList(!displayModeList)}
          icon={<UnorderedListOutlined />}
          size="large"
        />
      </Row>

      <Divider />
      {displayModeList ? (
        <CollapseTodoComponent
          todos={todos}
          checkOnClick={changeStatusTodo}
          removeTodo={removeTodo}
        />
      ) : (
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
                removeTodo={removeTodo}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
