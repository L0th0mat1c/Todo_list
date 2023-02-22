import React, { useContext } from "react";
import { Form, Button, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthContextType, RegisterFunctionProps } from "src/@types/auth";
import useErrorMessage from "src/utils/useMessage";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const Register = (): JSX.Element => {
  const { dispatchAPI } = useContext(AuthContext) as AuthContextType<any>;
  const navigate = useNavigate();
  const { success: success } = useErrorMessage();
  const [form] = Form.useForm();

  const registerUser = async (body: RegisterFunctionProps) => {
    try {
      await dispatchAPI({ type: "REGISTER", options: { ...body } });
      success({ content: "Account created !" });
      navigate("/login");
    } catch (error) {
      message.error(`Erreur serveur: ${error}`);
    }
  };
  const onFinish = (values: RegisterFunctionProps) => {
    registerUser(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input data-testid="username" aria-label="username" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input data-testid="email" aria-label="email" />
      </Form.Item>
      <Form.Item name="password" label="paswword" rules={[{ required: true }]}>
        <Input.Password data-testid="password" aria-label="password" />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label="Confirm password"
        rules={[{ required: true }]}
      >
        <Input.Password
          data-testid="confirm_password"
          aria-label="confirm_password"
        />
      </Form.Item>
      <Row justify="end">
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default Register;
