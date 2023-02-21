import { ITodo } from "./todo";

export interface CollapseTodoComponentProps extends React.HTMLAttributes<any> {
  todos: ITodo[];
  checkOnClick: (todoSelected: ITodo) => void;
  removeTodo: (id: string) => void;
  getTodo: (id: string) => void;
  updateTodo: (todoTarget: ITodo) => void;
}

export interface IGetExtraProps {
  idTodo: string;
  statusTodo: boolean;
}
