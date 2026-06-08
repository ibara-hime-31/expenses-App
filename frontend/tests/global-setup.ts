import { sauceVisualSetup } from "@saucelabs/visual-playwright";

export default async () => {
  if (process.env.SAUCE_VISUAL !== "true") return;
  await sauceVisualSetup({
    buildName: process.env.SAUCE_VISUAL_BUILD_NAME ?? "Sandbox Visual",
  });
};
