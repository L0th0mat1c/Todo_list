import {
  CaretRightOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  TabletFilled,
} from "@ant-design/icons";
import { Collapse, Descriptions, Divider } from "antd";
import React from "react";
import {
  CollapseTodoComponentProps,
  IGetExtraProps,
} from "src/@types/collapseTodoComponent";
import { ITodo } from "src/@types/todo";
import { format } from "date-fns";
import { colorsContext } from "src/utils/constants/colors";

const { Panel } = Collapse;

const CollapseTodoComponent = ({
  todos,
  checkOnClick,
  removeTodo,
}: CollapseTodoComponentProps): JSX.Element => {
  const panelStyle = (statusTodo: boolean) => {
    return {
      marginBottom: 24,
      border: "none",
      textDecorationLine: statusTodo ? "line-through" : "none",
    };
  };

  const genExtra = ({ idTodo, statusTodo }: IGetExtraProps) => (
    <>
      {!statusTodo && (
        <>
          <Divider type="vertical" />
          <EditOutlined key="edit" />
        </>
      )}

      <Divider type="vertical" />
      <CheckCircleFilled
        style={{
          color: statusTodo ? colorsContext.success : colorsContext.info,
        }}
        key="check"
        onClick={(event) => {
          event.stopPropagation();
          checkOnClick(idTodo);
        }}
      />
      <Divider type="vertical" />
      <TabletFilled
        style={{
          color: statusTodo ? colorsContext.success : colorsContext.info,
        }}
      />
      <Divider type="vertical" />
      <DeleteOutlined
        style={{
          color: colorsContext.error,
        }}
        onClick={(event) => {
          event.stopPropagation();
          removeTodo(idTodo);
        }}
      />
    </>
  );

  return (
    <>
      {(todos as unknown as ITodo[]).map(
        ({ id, title, description, status, createdDate }: ITodo) => (
          <Collapse
            key={id}
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel
              header={title}
              style={panelStyle(status)}
              extra={genExtra({ idTodo: id, statusTodo: status })}
              key={`${id}${title}`}
            >
              <Descriptions
                column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Description" span={3}>
                  {description}
                </Descriptions.Item>
                <Descriptions.Item label="Created at" span={1}>
                  <span style={{ color: "grey" }}>
                    {format(createdDate, "MM-dd-yyyy")}
                  </span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        )
      )}
    </>
  );
};

export default CollapseTodoComponent;
