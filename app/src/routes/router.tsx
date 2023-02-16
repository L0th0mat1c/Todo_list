import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicLayout from "../components/BasicLayout";
import Home from "./home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BasicLayout path="/">
              <Home />
            </BasicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
