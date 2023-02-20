import Router from "./routes/router";
import React from "react";
import TodoContextProvider from "./contexts/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <Router />
    </TodoContextProvider>
  );
}

export default App;
