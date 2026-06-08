import { test as base, expect } from "@playwright/test";
import { sauceVisualFixtures } from "@saucelabs/visual-playwright";

export const test = base.extend(sauceVisualFixtures());
export { expect };
