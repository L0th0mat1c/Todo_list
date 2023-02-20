export interface FormComponentProps {
  fields: Array<object>;
  name?: string;
  layout?: string;
  onFinish: (values: object | null) => void;
}
