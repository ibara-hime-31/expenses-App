import { sauceVisualTeardown } from "@saucelabs/visual-playwright"

export default async () => {
  if (process.env.SAUCE_VISUAL !== "true") return
  await sauceVisualTeardown()
}
