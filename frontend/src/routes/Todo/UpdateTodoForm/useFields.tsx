import React from "react";
import { Input, Switch } from "antd";
import { ExceptionOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const useFields = () => {
  const fields = [
    {
      name: ["_id"],
      rules: [{ required: true }],
      hidden: true,
      input: <Input />,
    },
    {
      name: ["title"],
      rules: [{ required: true }],
      input: (
        <Input prefix={<ExceptionOutlined />} placeholder="Your todo title" />
      ),
    },
    {
      name: ["description"],
      rules: [],
      input: <TextArea rows={3} placeholder="Your todo description" />,
    },
    {
      name: ["status"],
      rules: [{ required: true }],
      input: <Switch />,
    },
  ];

  return { fields };
};

export default useFields;
