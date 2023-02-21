import { message } from "antd";

interface MessageProps {
  status?: string;
  content?: string | undefined;
  duration?: number;
}
const useErrorMessage = () => {
  return {
    error: ({ status, duration = 5, content }: MessageProps) => {
      message.error(`Error server ${status}: ${content}`, duration);
    },
    success: ({ content, duration }: MessageProps) => {
      message.success(content || "", duration);
    },
    info: ({ content, duration }: MessageProps) => {
      message.info(content || "", duration);
    },
    warning: ({ content, duration }: MessageProps) => {
      message.warning(content || "", duration);
    },
    loading: ({ content, duration }: MessageProps) => {
      message.warning(content || "", duration);
    },
  };
};

export default useErrorMessage;
