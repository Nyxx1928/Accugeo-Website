import { expect, test } from "@playwright/test";

test("homepage smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Accugeo/i);
  await expect(page.getByRole("navigation").first()).toBeVisible();
  await expect(page.locator("section#home")).toBeVisible();
  await expect(page.locator("section#about")).toBeVisible();
  await expect(page.locator("section#services")).toBeVisible();
  await expect(page.locator("section#contact")).toBeVisible();
});
