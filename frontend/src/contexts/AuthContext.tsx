import React, { createContext, useState } from "react";
import { message } from "antd";
import jwtDecode from "jwt-decode";
import axios, { AxiosInstance } from "axios";
import { useStateWithLocalStorage } from "../utils/storage";
import { ChildrenProps } from "src/@types/common";
import {
  AuthContextType,
  LoginFunctionProps,
  RegisterProps,
} from "src/@types/auth";
import useErrorMessage from "src/utils/useMessage";

export const AuthContext = createContext<AuthContextType<any> | null>(null);

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export const AuthContextProvider = ({ children }: ChildrenProps) => {
  const { success: success, warning: warning } = useErrorMessage();
  const [user, setUser] = useStateWithLocalStorage({
    storageKey: "user",
    defaultValue:
      '{id: "151526",username: "Doe John",email: "john.doe@common.com"}',
  });
  const [token, setToken] = useStateWithLocalStorage({
    storageKey: "token",
    defaultValue: "null",
  });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setSession = (accessToken: string) => {
    if (accessToken) {
      setToken(accessToken);
      setIsValid(true);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      setToken("null");
      setIsValid(false);
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  };

  const loginAPI = async ({ email, password }: LoginFunctionProps) => {
    try {
      const result = await axiosInstance.post("/login", {
        email,
        password,
      });

      setUser(result.data.user);
      setSession(result.data.token);
      success({ content: "Connected !" });
      return result;
    } catch (e) {
      return warning({ content: "Error server when login" });
    }
  };

  const registerAPI = async (values: RegisterProps) => {
    try {
      return await axiosInstance.post("/register", values);
    } catch (e) {
      return e;
    }
  };

  const logout = () => {
    setSession("null");
    setUser(null);
  };

  const isTokenValid = (): boolean => {
    if (!token) return false;
    try {
      const decoded: object = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        message.warning("token expirée");
        setSession("null");
        return false;
      }
    } catch (e) {
      message.warning("Token erroné");
      setSession("null");
      return false;
    }
    if (!isValid) {
      setIsValid(true);
    }
    return true;
  };

  interface AxiosConfigProps {
    url: string;
    method: string;
    responseType: string;
    data: object;
    headers: object;
  }
  const fetchAPI = async (
    url = "",
    method = "GET",
    body = undefined,
    responseType = "json"
  ) => {
    try {
      // isTokenValid();
      console.log("ok");
      setIsLoading(true);
      const result = await axiosInstance<AxiosConfigProps>({
        url,
        method,
        responseType,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
          ["Content-Type"]: "application/json",
        },
      });
      setIsLoading(false);
      console.log(result);
      return result;
    } catch (e) {
      setIsLoading(false);
      return e;
    }
  };

  interface AxiosOptionsProps<T> {
    type: string;
    options: T;
  }

  const dispatchAPI = ({ type, options }: AxiosOptionsProps<any>) => {
    switch (type) {
      case "LOGIN":
        return loginAPI({ email: options.email, password: options.password });
      case "REGISTER":
        return registerAPI(options);
      case "LOGOUT":
        return logout();
      case "GET":
        return fetchAPI(options.url, "GET", options.responseType);
      case "DELETE":
        return fetchAPI(options.url, "DELETE");
      case "POST":
        return fetchAPI(options.url, type, options.body);
      case "PATCH":
        return fetchAPI(options.url, type, options.body);
      default:
        return "Switch error";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isValid,
        dispatchAPI,
        isLoading,
        setIsLoading,
        setIsValid,
        isTokenValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
