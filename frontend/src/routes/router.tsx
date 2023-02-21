import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChildrenProps } from "src/@types/common";
import { AuthContext } from "../contexts/AuthContext";
import BasicLayout from "../components/BasicLayout";
import { routes } from "../utils/constants/routes";
import { AuthContextType } from "src/@types/auth";
import LoginPage from "./LoginPage";

export const PrivateRoute = ({ children }: ChildrenProps): JSX.Element => {
  const { isTokenValid } = useContext(AuthContext) as AuthContextType<any>;

  if (!isTokenValid()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          {routes.map(({ path, component }): JSX.Element => {
            return (
              <Route
                key={path}
                path={path}
                element={<PrivateRoute>{component}</PrivateRoute>}
              />
            );
          })}
          <Route key="login" path="/login" element={<LoginPage />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default Router;
