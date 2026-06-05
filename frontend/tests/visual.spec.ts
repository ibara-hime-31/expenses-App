import { test } from "./fixtures"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test("sandbox light theme", async ({ page, sauceVisual }) => {
  await sauceVisual.visualCheck("homepage-light")
})

test("sandbox dark theme", async ({ page, sauceVisual }) => {
  await page.getByTestId("theme-toggle").click()
  await sauceVisual.visualCheck("homepage-dark")
})

test("sandbox with todos", async ({ page, sauceVisual }) => {
  await page.getByTestId("todo-input").fill("Buy groceries")
  await page.getByTestId("todo-add").click()
  await page.getByTestId("todo-input").fill("Walk the dog")
  await page.getByTestId("todo-add").click()
  await sauceVisual.visualCheck("homepage-with-todos")
})
