import {
  BorderOutlined,
  CaretRightOutlined,
  CheckCircleFilled,
  CheckSquareOutlined,
  DeleteOutlined,
  EyeOutlined,
  TabletFilled,
} from "@ant-design/icons";
import { Badge, Collapse, Descriptions, Divider, Row, Typography } from "antd";
import React from "react";
import { CollapseTodoComponentProps } from "src/@types/collapseTodoComponent";
import { ITask, ITodo, IUpdateTaskForm } from "src/@types/todo";
import { format, parseISO } from "date-fns";
import { colorsContext } from "src/utils/constants/colors";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const { Title } = Typography;

const CollapseTodoComponent = ({
  todos,
  checkOnClick,
  removeTodo,
  updateTodo,
}: CollapseTodoComponentProps): JSX.Element => {
  const navigate = useNavigate();

  const panelStyle = (statusTodo: boolean) => {
    return {
      marginBottom: 24,
      border: "none",
      textDecorationLine: statusTodo ? "line-through" : "none",
    };
  };

  const genExtra = (todo: ITodo) => (
    <>
      {!todo.status && (
        <>
          <Divider type="vertical" />
          <EyeOutlined
            key="edit"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/todo/${todo._id}`);
            }}
          />
        </>
      )}

      <Divider type="vertical" />
      <CheckCircleFilled
        style={{
          color: todo.status ? colorsContext.success : colorsContext.info,
        }}
        key="check"
        onClick={(event) => {
          event.stopPropagation();
          checkOnClick(todo);
        }}
      />
      <Divider type="vertical" />
      <TabletFilled
        style={{
          color: todo.status ? colorsContext.success : colorsContext.info,
        }}
      />
      <Divider type="vertical" />
      <DeleteOutlined
        style={{
          color: colorsContext.error,
        }}
        onClick={(event) => {
          event.stopPropagation();
          removeTodo(todo._id || "");
        }}
      />
    </>
  );

  const updateTask = ({ todoTarget, idTask }: IUpdateTaskForm) => {
    const updatedTask: ITask[] = todoTarget.tasks.map((task) => {
      if (task._id === idTask) {
        task.status = !task.status;

        return task;
      }
      return task;
    });

    updateTodo({ ...todoTarget, tasks: updatedTask });
  };

  return (
    <>
      {(todos as unknown as ITodo[]).map((todo: ITodo) => (
        <Collapse
          key={todo._id}
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel
            header={
              <Row justify="space-between">
                <span>{todo.title}</span>
                <Badge count={todo.tasks.length} />
              </Row>
            }
            style={panelStyle(todo.status)}
            extra={genExtra(todo)}
            key={`${todo._id}${todo.title}`}
          >
            <Descriptions
              column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Description" span={3}>
                {todo.description}
              </Descriptions.Item>
              <Descriptions.Item label="Created at" span={1}>
                <span style={{ color: "grey" }}>
                  {format(parseISO(todo.created_date as string), "MM-dd-yyyy")}
                </span>
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
              column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              {todo.tasks &&
                todo.tasks.length > 0 &&
                todo.tasks.map(({ _id, name_task, status }) => (
                  <>
                    <Descriptions.Item label="Name task" span={2}>
                      <Title level={5}>{name_task}</Title>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      {!status ? (
                        <BorderOutlined
                          onClick={() =>
                            updateTask({ todoTarget: todo, idTask: _id })
                          }
                          style={{ color: colorsContext.info, fontSize: 30 }}
                        />
                      ) : (
                        <CheckSquareOutlined
                          onClick={() =>
                            updateTask({ todoTarget: todo, idTask: _id })
                          }
                          style={{
                            color: colorsContext.success,
                            fontSize: 30,
                          }}
                        />
                      )}
                    </Descriptions.Item>
                  </>
                ))}
            </Descriptions>
          </Panel>
        </Collapse>
      ))}
    </>
  );
};

export default CollapseTodoComponent;
