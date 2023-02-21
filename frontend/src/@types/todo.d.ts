import { Dispatch, SetStateAction } from "react";

export interface ITodo {
  _id?: string | undefined;
  title: string;
  description?: string;
  status: boolean;
  created_date: Date | string;
  prevState: null;
  user_id: string;
  tasks: ITask[];
}

export interface ITask {
  _id?: string | undefined;
  name_task: string;
  status: boolean;
}

export interface IUpdateTaskForm {
  todoTarget: ITodo;
  idTask: string | undefined;
}

export type TodoContextType = {
  todos: ITodo[];
  createTodo: (todo: ITodo) => void;
  todoSelected: ITodo | undefined;
  loading: boolean;
  changeStatusTodo: (todoSelected: ITodo) => void;
  displayModeList: boolean;
  setDisplayModeList: Dispatch<SetStateAction<boolean>>;
  removeTodo: (id: string) => void;
  getTodo: (id: string) => void;
  getTodos: () => void;
  updateTodo: (todoToUpdate: ITodo) => void;
};
