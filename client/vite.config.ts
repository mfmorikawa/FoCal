/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "html"],
    },
    exclude: [...configDefaults.exclude, "packages/template/*"],
    globals: true,
  },
});
