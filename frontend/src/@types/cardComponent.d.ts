import { CardProps } from "antd";

export interface CardComponentProps extends CardProps {
  id: string;
  title: string;
  description?: string;
  status: boolean;
  actions?: Array<JSX.Element>;
  loading: boolean;
  checkOnClick: (id: string) => void;
}
