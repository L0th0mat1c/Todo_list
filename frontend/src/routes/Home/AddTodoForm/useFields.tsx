import React from "react";
import { Input } from "antd";
import { ExceptionOutlined } from "@ant-design/icons";

const useFields = () => {
  const fields = [
    {
      name: ["title"],
      rules: [{ required: true }],
      input: (
        <Input prefix={<ExceptionOutlined />} placeholder="Your todo title" />
      ),
    },
  ];

  return { fields };
};

export default useFields;
