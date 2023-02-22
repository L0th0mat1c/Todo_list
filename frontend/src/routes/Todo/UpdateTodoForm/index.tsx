import React, { useContext } from "react";
import FormComponent from "src/components/FormComponent";
import useFields from "./useFields";
import { TodoContext } from "../../../contexts/TodoContext";
import { ITodo, TodoContextType } from "src/@types/todo";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface UpdateTodoFormProps {
  data: ITodo;
}

const UpdateTodoForm = ({ data }: UpdateTodoFormProps): JSX.Element => {
  const { updateTodo } = useContext(TodoContext) as TodoContextType;
  const { fields } = useFields();
  const navigate = useNavigate();

  const onFinish = (values: ITodo) => {
    updateTodo({ ...values });
    navigate("/");
  };

  const ExtraFormTask = (): JSX.Element => {
    return (
      <Form.List name="tasks">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row
                justify="space-around"
                key={key}
                style={{ marginBottom: 8, width: "80%" }}
              >
                <Form.Item
                  {...restField}
                  name={[name, "name_task"]}
                  label="Name of task"
                  rules={[{ required: true, message: "Name task" }]}
                  style={{ marginBottom: 8, width: "70%" }}
                >
                  <Input placeholder="Name task" />
                </Form.Item>
                <Form.Item
                  valuePropName="checked"
                  {...restField}
                  label="Done"
                  name={[name, "status"]}
                >
                  <Checkbox style={{ fontSize: 45 }} />
                </Form.Item>
                <div style={{ alignContent: "center" }}>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add task
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  return (
    <FormComponent
      onFinish={onFinish}
      name="AddTodoForm"
      fields={fields}
      layout="vertical"
      data={data}
      extra={<ExtraFormTask />}
      withUpdate={false}
    />
  );
};

export default UpdateTodoForm;
