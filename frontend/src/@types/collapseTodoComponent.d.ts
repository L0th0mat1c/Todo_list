import { ITodo } from "./todo";

export interface CollapseTodoComponentProps extends React.HTMLAttributes<any> {
  todos: ITodo[];
  checkOnClick: (id: string) => void;
  removeTodo: (id: string) => void;
}

export interface IGetExtraProps {
  idTodo: string;
  statusTodo: boolean;
}
