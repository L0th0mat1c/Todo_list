import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
}

export type AuthContextType<T> = {
  user: User;
  token: string;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  dispatchAPI: T;
  isTokenValid: () => boolean;
};
export interface IToken {
  name: string;
  exp: number;
}

export type LoginFunctionProps = {
  email: string;
  password: string;
};

export type RegisterFunctionProps = {
  email: string;
  password: string;
  confirm_password: string;
};

export interface RegisterProps {
  url(
    url: any,
    arg1: string,
    arg2: null,
    responseType: any,
    cancelToken: any
  ): unknown;
  responseType(
    url: any,
    arg1: string,
    arg2: null,
    responseType: any,
    cancelToken: any
  ): unknown;
  body(url: any, type: string, body: any): unknown;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}
