// configures Vitest to run component tests in a browser-like DOM environment.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
