import React, { useContext } from "react";
import FormComponent from "src/components/FormComponent";
import useFields from "./useFields";
import { TodoContext } from "../../../contexts/TodoContext";
import { ITodo, TodoContextType } from "src/@types/todo";

const AddTodoForm = (): JSX.Element => {
  const { createTodo } = useContext(TodoContext) as TodoContextType;
  const { fields } = useFields();

  const onFinish = (values: ITodo) => {
    createTodo({ ...values });
  };

  return (
    <FormComponent onFinish={onFinish} name="AddTodoForm" fields={fields} />
  );
};

export default AddTodoForm;
