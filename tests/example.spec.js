import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('language', 'ro');
  });

  await page.goto('http://localhost:5173');

  await expect(
    page.getByRole('heading', { name: 'Provocări' }),
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Creează provocare' }),
  ).toBeVisible();
});