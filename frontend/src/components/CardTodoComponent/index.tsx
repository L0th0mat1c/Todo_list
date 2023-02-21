import {
  CheckCircleFilled,
  DeleteOutlined,
  EyeOutlined,
  TabletFilled,
} from "@ant-design/icons";
import { Badge, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { useNavigate } from "react-router";
import { CardTodoComponentProps } from "src/@types/cardTodoComponent";
import { ITodo } from "src/@types/todo";
import { colorsContext } from "src/utils/constants/colors";

const CardTodoComponent = ({
  todo,
  actions,
  loading,
  checkOnClick,
  removeTodo,
  getTodo,
  ...props
}: CardTodoComponentProps): JSX.Element => {
  const navigate = useNavigate();

  const genExtra = (todoSelected: ITodo) => {
    return [
      !todoSelected.status && (
        <EyeOutlined
          key="edit"
          onClick={() => navigate(`/todo/${todoSelected._id}`)}
        />
      ),
      <CheckCircleFilled
        style={{
          color: todoSelected.status
            ? colorsContext.success
            : colorsContext.info,
        }}
        key="check"
        onClick={() => checkOnClick(todoSelected)}
      />,
      <DeleteOutlined
        key="remove"
        style={{
          color: colorsContext.error,
        }}
        onClick={() => removeTodo(todoSelected._id || "")}
      />,
    ];
  };

  return (
    <Card
      {...props}
      key={todo._id}
      style={{ width: 300, marginTop: 16 }}
      loading={loading}
      actions={genExtra(todo)}
      extra={<Badge count={todo.tasks.length} />}
      title={todo.title}
    >
      <Meta
        style={{
          textDecorationLine: todo.status ? "line-through" : "none",
          color: todo!.description ? "grey" : "black",
        }}
        avatar={
          <TabletFilled
            style={{
              color: todo.status ? colorsContext.success : colorsContext.info,
            }}
          />
        }
        description={!todo.description ? "No description" : todo.description}
      />
    </Card>
  );
};

export default CardTodoComponent;
