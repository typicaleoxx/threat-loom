// verifies the application shell and relationship graph controls.
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

const graphMock = vi.hoisted(() => ({
  destroy: vi.fn(),
  fit: vi.fn(),
  on: vi.fn(),
  resize: vi.fn(),
}));

vi.mock("cytoscape", () => ({
  default: () => graphMock,
}));

class ResizeObserverMock {
  private readonly callback: ResizeObserverCallback;

  public constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  public disconnect(): void {}

  public observe(): void {
    this.callback([], this as unknown as ResizeObserver);
  }

  public unobserve(): void {}
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Home", () => {
  it("renders the application identity and relationship graph controls", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    render(await Home());

    expect(
      screen.getByRole("heading", { level: 1, name: "Threat Loom" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Threat relationship graph",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Fit graph" })).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Focus entity" })).toBeTruthy();
    expect(screen.getByText("Development data")).toBeTruthy();
    expect(graphMock.resize).toHaveBeenCalledOnce();
    expect(graphMock.fit).toHaveBeenCalledWith(undefined, 48);
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
