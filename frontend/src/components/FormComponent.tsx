import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "antd";
import { FormLayout } from "antd/es/form/Form";
import useGenerateFormItem from "src/utils/useGenerateFormItem";
import { FormComponentProps } from "src/@types/formComponent";

const FormComponent = ({
  onFinish,
  data = undefined,
  layout = "inline",
  name = "default-form",
  fields,
  extra,
  withUpdate = true,
}: FormComponentProps): JSX.Element => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const { generateField } = useGenerateFormItem();

  useEffect(() => {
    if (withUpdate) forceUpdate({});
    if (data) {
      setValues();
    }
  }, []);

  const handleSubmit = (values: object | null) => {
    onFinish(values);

    form.resetFields();
  };

  const setValues = useCallback(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Form
      form={form}
      name={name}
      layout={layout as FormLayout}
      onFinish={handleSubmit}
    >
      <>
        {fields.map((field) => generateField(field))}
        {extra}
      </>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update todo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
