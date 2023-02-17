import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicLayout from "../components/BasicLayout";
import Home from "./Home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default Router;
