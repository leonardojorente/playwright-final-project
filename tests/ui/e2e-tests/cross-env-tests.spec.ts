import { expect, test } from '@tests/ui/fixtures/pages-fixture';

const userName = process.env.USER!
const password = process.env.PASSWORD!

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('TC01 Success Login Prod env', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
  await loginPage.insertEmail(userName)
  await loginPage.insertPassword(password)
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage('Bem vindo, prod env!')).toBeVisible();
});

test('TC02 Success Login dev env', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
  await loginPage.insertEmail(userName)
  await loginPage.insertPassword(password)
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage('Bem vindo, dev env!')).toBeVisible();
});