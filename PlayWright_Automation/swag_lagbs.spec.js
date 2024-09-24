import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/v1/');
  
  // Fill out login details
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  
  // Click Login
  await page.getByRole('button', { name: 'LOGIN' }).click();
  
  // Ensure the login was successful by checking the URL or any specific post-login element
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  
  // Add item to cart
  await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
  
  // Go to cart
  await page.getByRole('link', { name: '1' }).click();
  
  // Ensure the item was added to the cart
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  
  // Proceed to checkout
  await page.getByRole('link', { name: 'CHECKOUT' }).click();
  
  // Fill out checkout information
  await page.locator('[data-test="firstName"]').fill('Delruba');
  await page.locator('[data-test="lastName"]').fill('Yesmin');
  await page.locator('[data-test="postalCode"]').fill('1212');
  
  // Continue the checkout process
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  
  // Finalize the order
  await page.getByRole('link', { name: 'FINISH' }).click();
  
  // Check the success message
  await expect(page.getByRole('heading')).toContainText('THANK YOU FOR YOUR ORDER');
});
