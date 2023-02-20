import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicLayout from "../components/BasicLayout";
import { routes } from "../utils/constants/routes";

const Router = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          {routes.map(({ path, component }): JSX.Element => {
            return <Route path={path} element={component} />;
          })}
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default Router;
