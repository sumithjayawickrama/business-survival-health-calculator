import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: ".vitest",
  test: {
    environment: "jsdom",
    exclude: ["node_modules", ".next", "out", ".vitest"],
    globals: true
  }
});
