import { test } from "./fixtures";

const API = "http://localhost:3003";

const MOCK_EXPENSES = [
  { _id: "1", title: "Morning coffee", cost: "5", category: "Food" },
  { _id: "2", title: "Internet bill", cost: "60", category: "Bills" },
  { _id: "3", title: "Movie tickets", cost: "25", category: "Entertainment" },
  { _id: "4", title: "Groceries", cost: "120", category: "Food" },
];

const MOCK_TOTALS = [
  { category: "Food", total: 125 },
  { category: "Bills", total: 60 },
  { category: "Entertainment", total: 25 },
];

test("expenses page with data", async ({ page, sauceVisual }) => {
  await page.route(`${API}/get`, (route) =>
    route.fulfill({ json: MOCK_EXPENSES }),
  );
  await page.route(`${API}/totals`, (route) =>
    route.fulfill({ json: MOCK_TOTALS }),
  );

  await page.goto("/");
  await page.getByText("Morning coffee").waitFor();

  await sauceVisual.visualCheck("expenses-with-data");
});

test("expenses page empty state", async ({ page, sauceVisual }) => {
  await page.route(`${API}/get`, (route) => route.fulfill({ json: [] }));
  await page.route(`${API}/totals`, (route) => route.fulfill({ json: [] }));

  await page.goto("/");
  await page.getByText("No expenses").waitFor();

  await sauceVisual.visualCheck("expenses-empty");
});
