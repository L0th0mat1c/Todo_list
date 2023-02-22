import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import React from "react";
import { ITodo } from "src/@types/todo";
import CardTodoComponent from "../../src/components/CardTodoComponent";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const todTest: ITodo = {
  _id: "1516444644464646",
  title: "test title",
  description: "test description",
  status: true,
  created_date: new Date().toString(),
  tasks: [],
  prevState: null,
  user_id: "",
};

const checkOnClick = (_todo: ITodo) => {
  return true;
};

const removeTodo = (_id: string) => {
  return true;
};

const getTodo = (_id: string) => {
  return true;
};

describe("Card todo component", () => {
  it("Display one card with excat button and data description", async () => {
    render(
      <BrowserRouter>
        <CardTodoComponent
          todo={todTest}
          loading={false}
          checkOnClick={(todTest: ITodo): boolean => checkOnClick(todTest)}
          removeTodo={(id: string): boolean => removeTodo(id)}
          getTodo={(id: string): boolean => getTodo(id)}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("test title")).toBeTruthy();
    expect(screen.getByText("test description")).toBeTruthy();

    const iconTablet = document.querySelector('[aria-label="tablet"]');
    expect(iconTablet).toBeTruthy();
    expect(iconTablet).toBeEnabled();

    const iconEye = document.querySelector('[aria-label="eye"]');
    expect(iconEye).toBeFalsy();

    const iconCheckCircle = document.querySelector(
      '[aria-label="check-circle"]'
    );
    expect(iconCheckCircle).toBeTruthy();
    expect(iconTablet).toBeEnabled();

    const iconDelete = document.querySelector('[aria-label="delete"]');
    expect(iconDelete).toBeTruthy();
    expect(iconTablet).toBeEnabled();
  });
});
