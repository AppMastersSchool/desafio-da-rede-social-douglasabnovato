// Teste de ponta a ponta no navegador, sobre o build (vite preview).
import { defineConfig, devices } from "@playwright/test";

const porta = Number(process.env.PORTA_TESTE || 4317);

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${porta}`,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "claro", use: { ...devices["Desktop Chrome"], colorScheme: "light" } },
    { name: "escuro", use: { ...devices["Desktop Chrome"], colorScheme: "dark" } },
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${porta} --strictPort`,
    url: `http://localhost:${porta}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
