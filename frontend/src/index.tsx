import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root") as HTMLElement;
if (!rootEl) throw new Error("Cannot find react root");
const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
