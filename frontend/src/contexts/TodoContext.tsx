import React, { createContext, useState } from "react";
import { ChildrenProps } from "src/@types/common";
import useErrorMessage from "src/utils/useMessage";
import { TodoContextType, ITodo } from "../@types/todo";

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoContextProvider = ({ children }: ChildrenProps) => {
  const { success: success } = useErrorMessage();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading] = useState(false);

  const saveTodo = ({ title }: ITodo) => {
    const newTodo: ITodo = {
      id: Math.round(Math.random() * 10).toString(),
      title: title,
      description: "no description",
      status: false,
      createdDate: new Date(),
    };

    const newList = [...todos, newTodo];
    const newListSorted = newList.sort(
      (dateA, dateB) =>
        dateB.createdDate.getTime() - dateA.createdDate.getTime()
    );

    setTodos(newListSorted);

    success({ content: "New todo is created !" });
  };

  const changeStatusTodo = (id: string) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
        setTodos([...todos]);
      }
    });
    success({ content: "Todo is updated !" });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        saveTodo,
        changeStatusTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
