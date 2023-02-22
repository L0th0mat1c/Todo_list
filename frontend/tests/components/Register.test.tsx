// @ts-nocheck
import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Register from "../../src/components/Register";
import AuthContextProvider from "src/contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Register component tests", () => {
  it("Renders correctly initial form", async () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContextProvider>
    );

    const inputEmail = document.querySelector('[aria-label="email"]');
    expect(inputEmail).toBeTruthy();
    expect(inputEmail).toBeEnabled();

    const inputUsername = document.querySelector('[aria-label="username"]');
    expect(inputUsername).toBeTruthy();
    expect(inputUsername).toBeEnabled();

    const inputPassword = document.querySelector('[aria-label="password"]');
    expect(inputPassword).toBeTruthy();
    expect(inputPassword).toBeEnabled();

    const inputConfirmPassword = document.querySelector(
      '[aria-label="confirm_password"]'
    );
    expect(inputConfirmPassword).toBeTruthy();
    expect(inputConfirmPassword).toBeEnabled();
  });
});
