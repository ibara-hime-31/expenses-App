import { test, expect } from "@playwright/test";

test("can add an expense and see it in the list", async ({ page }) => {
  const uniqueTitle = `e2e-${Date.now()}`;
  const cost = "42";
  const category = "Food";

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Expenses Report" }),
  ).toBeVisible();

  await page
    .getByPlaceholder("Enter the title of the expense")
    .fill(uniqueTitle);
  await page.getByPlaceholder("Enter the amount of the expense").fill(cost);
  await page
    .getByPlaceholder("Enter the category of the expense")
    .fill(category);

  await page.getByRole("button", { name: "Add" }).click();

  await page.waitForLoadState("networkidle");

  await expect(page.getByText(`Title: ${uniqueTitle}`)).toBeVisible();
  await expect(page.getByText(`Cost: ${cost}`).last()).toBeVisible();
  await expect(page.getByText(`Category: ${category}`).last()).toBeVisible();
});
