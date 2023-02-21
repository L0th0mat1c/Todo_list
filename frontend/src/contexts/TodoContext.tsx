import React, { createContext, useState, useContext } from "react";
import { AuthContextType } from "src/@types/auth";
import { ChildrenProps } from "src/@types/common";
import useErrorMessage from "src/utils/useMessage";
import { TodoContextType, ITodo } from "../@types/todo";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoContextProvider = ({ children }: ChildrenProps) => {
  const { success: success, warning: warning } = useErrorMessage();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoSelected, setTodoSelected] = useState<ITodo | undefined>();
  const [displayModeList, setDisplayModeList] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { dispatchAPI, user } = useContext(AuthContext) as AuthContextType<any>;

  const getTodos = async () => {
    setLoading(true);
    try {
      const { data } = await dispatchAPI({
        type: "GET",
        options: { url: "/todos" },
      });

      const newListSorted: ITodo[] = data?.todos
        ?.sort(
          (dateA: { created_date: string }, dateB: { created_date: string }) =>
            dateB.created_date.localeCompare(dateA.created_date)
        )
        .sort((todo: ITodo) => (!todo.status ? -1 : 1));

      setTodos(newListSorted);
      setLoading(false);
    } catch (error) {
      warning({ content: `Erreur serveur: ${error}` });
    }
  };

  const createTodo = async ({ title }: ITodo) => {
    setLoading(true);
    const newTodo: ITodo = {
      title: title,
      status: false,
      created_date: new Date(),
      prevState: null,
      user_id: user.id,
      tasks: [],
    };
    try {
      await dispatchAPI({
        type: "POST",
        options: { url: `/todos`, body: newTodo },
      });
    } catch (error) {
      warning({ content: `Erreur serveur: ${error}` });
    }
    getTodos();

    success({ content: "New todo is created !" });
  };

  const getTodo = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await dispatchAPI({
        type: "GET",
        options: {
          url: `/todos/${id}`,
        },
      });
      setTodoSelected(data.todo);
    } catch (error) {
      warning({ content: `Erreur serveur: ${error}` });
    }
    setLoading(false);
  };

  const updateTodo = async (todoToUpdate: ITodo) => {
    setLoading(true);
    try {
      await dispatchAPI({
        type: "PATCH",
        options: {
          url: `/todos/${todoToUpdate._id}`,
          body: todoToUpdate,
        },
      });
    } catch (error) {
      warning({ content: `Erreur serveur: ${error}` });
    }
    setTodoSelected(undefined);
    getTodos();

    success({ content: "Todo is updated !" });
  };

  const changeStatusTodo = async (todoSelected: ITodo) => {
    setLoading(true);
    try {
      await dispatchAPI({
        type: "PATCH",
        options: {
          url: `/todos/${todoSelected._id}`,
          body: todoSelected,
        },
      });
    } catch (error) {
      warning({ content: `Erreur serveur: ${error}` });
    }

    getTodos();

    success({ content: "Todo is updated !" });
  };

  const removeTodo = async (id: string) => {
    setLoading(true);
    try {
      await dispatchAPI({
        type: "DELETE",
        options: {
          url: `/todos/${id}`,
        },
      });
    } catch (error) {
      warning({ content: `Erreur serveur: ${error}` });
    }
    getTodos();

    warning({ content: "Todo is removed !" });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        createTodo,
        changeStatusTodo,
        displayModeList,
        setDisplayModeList,
        removeTodo,
        getTodo,
        todoSelected,
        getTodos,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
