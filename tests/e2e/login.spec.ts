import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays login form", async ({ page }) => {
    // Check for AI.MeD logo
    await expect(page.getByAltText("AI.MeD")).toBeVisible();

    // Check for title
    await expect(page.getByText("Dark Gene Atlas")).toBeVisible();
    await expect(
      page.getByText("Sign in to access your research.")
    ).toBeVisible();

    // Check for Google login button
    await expect(
      page.getByRole("button", { name: /Continue with Google/i })
    ).toBeVisible();

    // Check for enterprise login button
    await expect(
      page.getByRole("button", { name: /Enterprise.*Institutional Login/i })
    ).toBeVisible();
  });

  test("shows email form when clicking sign in with email", async ({ page }) => {
    await page.getByText("Or sign in with email").click();

    await expect(page.getByPlaceholder("Email address")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("shows enterprise SSO form", async ({ page }) => {
    await page
      .getByRole("button", { name: /Enterprise.*Institutional Login/i })
      .click();

    await expect(
      page.getByText("Enter your institutional email to continue with SSO")
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("you@university.edu")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Continue with SSO" })
    ).toBeVisible();
  });

  test("can navigate back to login options", async ({ page }) => {
    // Go to email form
    await page.getByText("Or sign in with email").click();

    // Click back
    await page.getByText("Back to login options").click();

    // Should see Google button again
    await expect(
      page.getByRole("button", { name: /Continue with Google/i })
    ).toBeVisible();
  });
});
