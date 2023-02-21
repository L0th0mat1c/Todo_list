import React, { useContext } from "react";
import { Form, Button, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthContextType, LoginFunctionProps } from "src/@types/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const Login = (): JSX.Element => {
  const { dispatchAPI } = useContext(AuthContext) as AuthContextType<any>;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const loginUser = async (body: LoginFunctionProps) => {
    try {
      await dispatchAPI({ type: "LOGIN", options: { ...body } });
      navigate("/");
    } catch (error) {
      message.error(`Erreur serveur: ${error}`);
    }
  };
  const onFinish = (values: LoginFunctionProps) => {
    console.log(values);
    loginUser(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Row justify="end">
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default Login;
