import React from "react";
import { Layout, Typography } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const StyledLayout = styled.div`
  height: 100vh;
`;

const StyledContent = styled.div`
  margin: 100px 100px 100px 100px;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 992px) {
    margin-left: 100px;
  }

  @media (max-width: 576px) {
    margin-left: 24px;
  }
`;

const StyledFooter = styled.footer`
  padding: 8px 25px;
  text-align: center;
  background-color: #c4c4c4;
  color: var(--textColor);
  box-shadow: 0 -1px 4px var(--borderColor);

  a {
    color: var(--textColor);
    font-weight: bold;
  }

  @media (max-width: 992px) {
    margin-left: 80px;
  }

  @media (max-width: 576px) {
    margin-left: 0;
  }
`;

const { Title } = Typography;

interface BasicLayoutProps {
  children: JSX.Element;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <StyledLayout as={Layout}>
      <Layout>
        <Header style={{ zIndex: 1, width: "100%" }}>
          <Title style={{ color: "white" }} level={2}>
            <NavLink to="/">Todo List</NavLink>
          </Title>
        </Header>
        <StyledContent as={Content}>{children}</StyledContent>
        <StyledFooter as={Footer}>
          <p>Todo list project</p>
        </StyledFooter>
      </Layout>
    </StyledLayout>
  );
};
export default BasicLayout;
