import { defineConfig, devices } from "@playwright/test"

const onSauce = process.env.SAUCE_RUN === "true"

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./tests/global-setup.ts",
  globalTeardown: "./tests/global-teardown.ts",
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: onSauce
    ? undefined
    : {
        command: "npm run dev -- --host",
        url: "http://localhost:5173",
        reuseExistingServer: true,
        timeout: 30_000,
      },
})
