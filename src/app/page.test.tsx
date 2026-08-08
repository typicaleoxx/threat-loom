// verifies the baseline application shell through its visible content.
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "./page";

afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("renders the application identity and future visualization workspace", async () => {
    render(await Home());

    expect(
      screen.getByRole("heading", { level: 1, name: "Threat Loom" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Relationship workspace",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Development data")).toBeTruthy();
  });

  it("renders repository-backed exploration sections", async () => {
    render(await Home());

    const actors = screen.getByRole("region", { name: "Threat Actors" });
    const industries = screen.getByRole("region", { name: "Industries" });
    const techniques = screen.getByRole("region", {
      name: "MITRE ATT&CK Techniques",
    });

    expect(within(actors).getByText("1 record")).toBeTruthy();
    expect(within(actors).getByText("Development Actor Atlas")).toBeTruthy();
    expect(within(industries).getByText("2 records")).toBeTruthy();
    expect(
      within(industries).getByText("Development Industry Aurora"),
    ).toBeTruthy();
    expect(
      within(industries).getByText("Development Industry Beacon"),
    ).toBeTruthy();
    expect(within(techniques).getByText("1 record")).toBeTruthy();
    expect(
      within(techniques).getByText("Development Technique Cascade"),
    ).toBeTruthy();
  });
});
