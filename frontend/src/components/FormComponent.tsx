import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { FormLayout } from "antd/es/form/Form";
import useGenerateFormItem from "src/utils/useGenerateFormItem";

interface FormComponentProps {
  fields: Array<object>;
  name?: string;
  layout?: string;
  onFinish: (values: object | null) => void;
}

interface FieldProps {
  name: string;
  rules?: Array<object> | [];
  input: JSX.Element;
}

const FormComponent = ({
  onFinish,
  layout = "inline",
  name = "default-form",
  fields,
}: FormComponentProps): JSX.Element => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const { generateField } = useGenerateFormItem();

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form
      form={form}
      name={name}
      layout={layout as FormLayout}
      onFinish={onFinish}
    >
      {fields.map((field) => generateField(field))}

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Add todo
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
