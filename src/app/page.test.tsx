// verifies the minimal application shell through its visible content.
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "./page";

afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("renders the application foundation status", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Threat Loom" }),
    ).toBeTruthy();
    expect(
      screen.getByText("The application foundation is running."),
    ).toBeTruthy();
  });
});
