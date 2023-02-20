import React, { Key } from "react";
import { Form, FormItemProps, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

interface UseGenerateFormItemProps extends FormItemProps {
  input: JSX.Element;
  key: Key;
  label?: "";
  name: NamePath;
  rules: object[];
}

const useGenerateFormItem = () => {
  const generateField = ({
    label = "",
    name = ["default"],
    initialValue,
    hasFeedback = false,
    rules = [],
    input,
    extra,
    noStyle = false,
    hidden = false,
    colon = false,
    key,
  }: UseGenerateFormItemProps) => (
    <Form.Item
      key={key || null}
      name={name}
      noStyle={noStyle}
      hidden={hidden}
      initialValue={initialValue}
      colon={colon}
      label={label}
      hasFeedback={hasFeedback}
      rules={rules}
      extra={extra}
    >
      {input || <Input />}
    </Form.Item>
  );

  return { generateField };
};

export default useGenerateFormItem;
