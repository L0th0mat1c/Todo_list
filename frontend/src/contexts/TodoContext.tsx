import React, { createContext, useState } from "react";
import { ChildrenProps } from "src/@types/common";
import useErrorMessage from "src/utils/useMessage";
import { TodoContextType, ITodo } from "../@types/todo";

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoContextProvider = ({ children }: ChildrenProps) => {
  const { success: success, warning: warning } = useErrorMessage();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [displayModeList, setDisplayModeList] = useState<boolean>(false);
  const [loading] = useState(false);

  const saveTodo = ({ title }: ITodo) => {
    const newTodo: ITodo = {
      id: Math.round(Math.random() * 10000).toString(),
      title: title,
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
    const newList = todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
        return todo;
      }
      return todo;
    });

    const newListSorted = newList.sort((todo) => {
      return todo.status ? 1 : -1;
    });

    setTodos(newListSorted);

    success({ content: "Todo is updated !" });
  };

  const removeTodo = (id: string) => {
    console.log(id);
    const newListTodosAfterDeletion = todos.filter(
      (todo: ITodo) => todo.id !== id
    );

    setTodos(newListTodosAfterDeletion);

    warning({ content: "Todo is removed !" });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        saveTodo,
        changeStatusTodo,
        displayModeList,
        setDisplayModeList,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
