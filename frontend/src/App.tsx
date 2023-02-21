import Router from "./routes/router";
import React from "react";
import TodoContextProvider from "./contexts/TodoContext";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <TodoContextProvider>
        <Router />
      </TodoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
