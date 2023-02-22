// @ts-nocheck
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import React from "react";
import { ITodo } from "src/@types/todo";
import CollapseTodoComponent from "../../src/components/CollapseTodoComponent";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const todosTest: ITodo[] = [
  {
    _id: "1516444644464646",
    title: "test title 1",
    description: "test description 1",
    status: true,
    created_date: new Date().toISOString(),
    tasks: [],
    prevState: null,
    user_id: "",
  },
  {
    _id: "1516444644464516",
    title: "test title 2",
    description: "test description 2",
    status: false,
    created_date: new Date().toISOString(),
    tasks: [],
    prevState: null,
    user_id: "",
  },
  {
    _id: "1516452644464646",
    title: "test title 3",
    description: "test description 3",
    status: true,
    created_date: new Date().toISOString(),
    tasks: [],
    prevState: null,
    user_id: "",
  },
];

const checkOnClick = (_todo: ITodo) => {
  return true;
};

const removeTodo = (_id: string) => {
  return true;
};

const getTodo = (_id: string) => {
  return true;
};

const updateTodo = (_todoTarget: ITodo) => {
  return true;
};

describe("Collapse todo component", () => {
  it("Display one collapse for each todo with excat button and data description", async () => {
    render(
      <BrowserRouter>
        <div>
          <CollapseTodoComponent
            todos={todosTest}
            checkOnClick={(todTest: ITodo): boolean => checkOnClick(todTest)}
            removeTodo={(id: string): boolean => removeTodo(id)}
            getTodo={(id: string): boolean => getTodo(id)}
            updateTodo={(todoTarget: ITodo): boolean => updateTodo(todoTarget)}
          />
        </div>
      </BrowserRouter>
    );
    todosTest.forEach((todotest) => {
      expect(screen.getByText(todotest.title)).toBeTruthy();

      const iconTablet = document.querySelector('[aria-label="tablet"]');
      expect(iconTablet).toBeTruthy();
      expect(iconTablet).toBeEnabled();

      const iconEye = document.querySelector('[aria-label="eye"]');
      expect(iconEye).toBeTruthy();

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
});
