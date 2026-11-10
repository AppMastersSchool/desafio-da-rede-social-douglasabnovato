import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativa: o build funciona em qualquer pasta de hospedagem estática
export default defineConfig({
  base: "./",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
