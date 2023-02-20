import { CardProps } from "antd";

export interface CardTodoComponentProps extends CardProps {
  id: string;
  title: string;
  description?: string;
  status: boolean;
  actions?: Array<JSX.Element>;
  loading: boolean;
  checkOnClick: (id: string) => void;
  removeTodo: (id: string) => void;
}
