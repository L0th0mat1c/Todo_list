import React from "react";
import FormComponent from "src/components/FormComponent";
import useFields from "./useFields";

const AddTodoForm = (): JSX.Element => {
  const { fields } = useFields();

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  return (
    <FormComponent onFinish={onFinish} name="AddTodoForm" fields={fields} />
  );
};

export default AddTodoForm;
