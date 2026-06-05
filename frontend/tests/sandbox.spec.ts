import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test("renders the sandbox", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Sauce Test Sandbox" })).toBeVisible()
  await expect(page.getByTestId("counter-value")).toHaveText("0")
  await expect(page.getByTestId("todo-empty")).toBeVisible()
})

test("counter increments and resets", async ({ page }) => {
  const value = page.getByTestId("counter-value")
  await expect(value).toHaveText("0")

  await page.getByTestId("counter-inc").click()
  await page.getByTestId("counter-inc").click()
  await page.getByTestId("counter-inc").click()
  await expect(value).toHaveText("3")

  await page.getByTestId("counter-dec").click()
  await expect(value).toHaveText("2")

  await page.getByTestId("counter-reset").click()
  await expect(value).toHaveText("0")
})

test("can add, toggle, and remove a todo", async ({ page }) => {
  await page.getByTestId("todo-input").fill("Buy groceries")
  await page.getByTestId("todo-add").click()

  await expect(page.getByText("Buy groceries")).toBeVisible()
  await expect(page.getByTestId("todo-count")).toHaveText("1 of 1 remaining")

  const checkbox = page.locator('[data-testid^="todo-check-"]').first()
  await checkbox.check()
  await expect(page.getByTestId("todo-count")).toHaveText("0 of 1 remaining")

  await page.locator('[data-testid^="todo-remove-"]').first().click()
  await expect(page.getByTestId("todo-empty")).toBeVisible()
})

test("theme toggle flips label", async ({ page }) => {
  const toggle = page.getByTestId("theme-toggle")
  await expect(toggle).toHaveText("Dark mode")
  await toggle.click()
  await expect(toggle).toHaveText("Light mode")
})
