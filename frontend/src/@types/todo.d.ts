import { Dispatch, SetStateAction } from "react";

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  status: boolean;
  createdDate: Date;
}

export type TodoContextType = {
  todos: ITodo[];
  saveTodo: (todo: ITodo) => void;
  loading: boolean;
  changeStatusTodo: (id: string) => void;
  displayModeList: boolean;
  setDisplayModeList: Dispatch<SetStateAction<boolean>>;
  removeTodo: (id: string) => void;
};
