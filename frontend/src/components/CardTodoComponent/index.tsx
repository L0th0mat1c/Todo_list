import {
  CheckCircleFilled,
  EditOutlined,
  TabletFilled,
} from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { CardComponentProps } from "src/@types/cardComponent";

const CardTodoComponent = ({
  id,
  title,
  description,
  status,
  actions,
  loading,
  checkOnClick,
  ...props
}: CardComponentProps): JSX.Element => {
  return (
    <Card
      {...props}
      key={id}
      style={{ width: 300, marginTop: 16 }}
      loading={loading}
      actions={[
        <CheckCircleFilled
          style={{ color: status ? "green" : "grey" }}
          key="check"
          onClick={() => checkOnClick(id)}
        />,
        <EditOutlined key="edit" />,
      ]}
    >
      <Meta
        style={{ textDecorationLine: status ? "line-through" : "none" }}
        avatar={<TabletFilled style={{ color: status ? "green" : "black" }} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

export default CardTodoComponent;
