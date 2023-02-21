import { Col, Layout, Row, Switch } from "antd";
import React, { useState } from "react";
import Register from "src/components/Register";
import Login from "../../components/Login";

const LoginPage = (): JSX.Element => {
  const [isLogin, setIslogin] = useState(true);
  return (
    // <div
    //   style={{
    //     margin: "0px 600px 0px",
    //     border: "0.2px solid",
    //     padding: 50,
    //   }}
    // >

    // </div>
    <Layout style={{ minHeight: "100%", display: "inherit" }}>
      <Row justify="center">
        <Col
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          style={{ backgroundColor: "var(--componentBackground)" }}
        >
          <p style={{ fontSize: 22, textAlign: "center", color: "grey" }}>
            Todo list - Login
          </p>
          <Row justify="center" style={{ margin: 50 }}>
            <Switch
              onChange={() => setIslogin(!isLogin)}
              checkedChildren="Login"
              unCheckedChildren="Register"
              defaultChecked={isLogin}
            />
          </Row>
          {isLogin ? <Login /> : <Register />}
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginPage;
