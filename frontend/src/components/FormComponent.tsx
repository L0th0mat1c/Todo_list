import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import { FormLayout } from "antd/es/form/Form";
import useGenerateFormItem from "src/utils/useGenerateFormItem";
import { FormComponentProps } from "src/@types/formComponent";

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

  const handleSubmit = (values: object | null) => {
    onFinish(values);

    form.resetFields();
  };

  return (
    <Form
      form={form}
      name={name}
      layout={layout as FormLayout}
      onFinish={handleSubmit}
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
