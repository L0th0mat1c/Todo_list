import { CardProps } from "antd";
import { ITodo } from "./todo";

export interface CardTodoComponentProps extends CardProps {
  todo: ITodo;
  actions?: Array<JSX.Element>;
  loading: boolean;
  checkOnClick: (todoSelected: ITodo) => void;
  removeTodo: (id: string) => void;
  getTodo: (id: string) => void;
}
