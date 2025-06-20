import { expect } from '@playwright/test';
import { test } from '../fixtures/pages-fixture';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('https://barrigareact.wcaquino.me');
});

[
  { userName: 'leonardoprodenv@gmail.com', password: 'prodenv', toastMessage: 'Bem vindo, prod env!' },
  { userName: 'leonardodevenv@gmail.com', password: 'devenv', toastMessage: 'Bem vindo, dev env!' },
].forEach(({ userName, password, toastMessage }) => {
  test(`TC01 Data Driven test with user: ${userName}`, {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
    await loginPage.insertEmail(userName)
    await loginPage.insertPassword(password)
    await loginPage.clickSignInButton()

    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(toastMessage)).toBeVisible();
  });
});