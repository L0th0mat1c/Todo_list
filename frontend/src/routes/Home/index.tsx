import React, { useContext, useEffect } from "react";
import AddTodoForm from "./AddTodoForm/AddTodoForm";
import { Divider, Row, Col, Button, Spin } from "antd";
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
    getTodo,
    getTodos,
    updateTodo,
  } = useContext(TodoContext) as TodoContextType;

  useEffect(() => {
    getTodos();
  }, []);

  const updateTodoSelected = (todoSelected: ITodo) => {
    const newValue = { ...todoSelected, status: !todoSelected.status };
    changeStatusTodo(newValue);
  };

  return (
    <div>
      <Row justify="space-between">
        <AddTodoForm />
        <Button
          style={{ marginRight: 50 }}
          type={displayModeList ? "primary" : "default"}
          onClick={() => setDisplayModeList(!displayModeList)}
          icon={<UnorderedListOutlined />}
          size="large"
        />
      </Row>

      <Divider />
      <Spin spinning={loading}>
        {displayModeList ? (
          <CollapseTodoComponent
            todos={todos}
            checkOnClick={updateTodoSelected}
            removeTodo={removeTodo}
            getTodo={getTodo}
            updateTodo={updateTodo}
          />
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {todos?.map((todo: ITodo) => (
              <Col key={todo._id} className="gutter-row" span={6}>
                <CardTodoComponent
                  todo={todo}
                  loading={loading}
                  checkOnClick={() => updateTodoSelected(todo)}
                  removeTodo={removeTodo}
                  getTodo={getTodo}
                />
              </Col>
            ))}
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default Home;
