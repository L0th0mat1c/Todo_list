import { ITodo } from "./todo";

export interface FormComponentProps {
  fields: Array<object>;
  data?: ITodo;
  name?: string;
  layout?: string;
  onFinish: (values: object | null) => void;
  extra?: JSX.Element;
  withUpdate: boolean;
}
