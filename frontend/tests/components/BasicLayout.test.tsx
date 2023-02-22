// @ts-nocheck
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BasicLayout from "../../src/components/BasicLayout";
import { BrowserRouter } from "react-router-dom";

const mockedUseLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useLocation: () => mockedUseLocation,
}));

describe("Bacis layout component tests", () => {
  it("Renders correctly initial header and footer", async () => {
    render(
      <BrowserRouter>
        <BasicLayout>
          <div>Layout Test</div>
        </BasicLayout>
      </BrowserRouter>
    );

    const header = document.querySelector("header");
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Todo List");

    const footer = document.querySelector("footer");
    expect(footer).toBeTruthy();
    expect(footer).toHaveTextContent("Todo list project");
  });
});
