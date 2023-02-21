import React, { useContext } from "react";
import { Form, Button, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthContextType, RegisterFunctionProps } from "src/@types/auth";

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
  const [form] = Form.useForm();

  const registerUser = async (body: RegisterFunctionProps) => {
    try {
      await dispatchAPI({ type: "REGISTER", options: { ...body } });
      console.log("end");
      success("Account created !");
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
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="paswword" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label="Confirm password"
        rules={[{ required: true }]}
      >
        <Input.Password />
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
function success(arg0: string) {
  throw new Error("Function not implemented.");
}
