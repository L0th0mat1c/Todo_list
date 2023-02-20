import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  TabletFilled,
} from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { CardTodoComponentProps } from "src/@types/cardTodoComponent";
import { IGetExtraProps } from "src/@types/collapseTodoComponent";
import { colorsContext } from "src/utils/constants/colors";

const CardTodoComponent = ({
  id,
  title,
  description,
  status,
  actions,
  loading,
  checkOnClick,
  removeTodo,
  ...props
}: CardTodoComponentProps): JSX.Element => {
  const genExtra = ({ idTodo, statusTodo }: IGetExtraProps) => {
    return [
      !statusTodo && <EditOutlined key="edit" />,
      <CheckCircleFilled
        style={{
          color: statusTodo ? colorsContext.success : colorsContext.info,
        }}
        key="check"
        onClick={() => checkOnClick(idTodo)}
      />,
      <DeleteOutlined
        key="remove"
        style={{
          color: colorsContext.error,
        }}
        onClick={() => removeTodo(idTodo)}
      />,
    ];
  };

  return (
    <Card
      {...props}
      key={id}
      style={{ width: 300, marginTop: 16 }}
      loading={loading}
      actions={genExtra({ idTodo: id, statusTodo: status })}
    >
      <Meta
        style={{
          textDecorationLine: status ? "line-through" : "none",
          color: !description ? "grey" : "black",
        }}
        avatar={
          <TabletFilled
            style={{
              color: status ? colorsContext.success : colorsContext.info,
            }}
          />
        }
        title={title}
        description={!description ? "No description" : description}
      />
    </Card>
  );
};

export default CardTodoComponent;
