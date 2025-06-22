import { expect, test } from '@tests/ui/fixtures/pages-fixture';
import  labelMessage from '@tests/data/label-messages.json';

const userName = 'cypresstest@gmail.com'
const password = 'cypress'

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('https://barrigareact.wcaquino.me');
});

test.describe('runs in parallel with other describes', () => {
  test.describe.configure({ mode: 'default' });
  test('TC01 Paralell Success Login', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
    await loginPage.insertEmail(userName)
    await loginPage.insertPassword(password)
    await loginPage.clickSignInButton()

  // Expect a toast to have the message
    await expect(toastComponent.toastMessage(labelMessage.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();
  });

  test('TC02 Paralell Success Logout', {tag: '@regression'}, async ({ loginPage, toastComponent, topMenuComponent }) => {
    await loginPage.loginWebApp(userName, password);
    await topMenuComponent.clickSettingsOption(labelMessage.TOP_MENU_COMPONENT.SETTINGS_OPTION_LOGOUT);

    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(labelMessage.TOAST_COMPONENT.LOGOUT_MESSAGE)).toBeVisible();
  });
});

test.describe('runs in serial with other describes', () => {
  test.describe.configure({ mode: 'serial' });
  test('TC03 Serial Success Login', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
    await loginPage.insertEmail(userName)
    await loginPage.insertPassword(password)
    await loginPage.clickSignInButton()

    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(labelMessage.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();
  });

  test('TC04 Serial Success Logout', {tag: '@regression'}, async ({ loginPage, toastComponent, topMenuComponent }) => {
    await loginPage.loginWebApp(userName, password);
    await topMenuComponent.clickSettingsOption(labelMessage.TOP_MENU_COMPONENT.SETTINGS_OPTION_LOGOUT);

    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(labelMessage.TOAST_COMPONENT.LOGOUT_MESSAGE)).toBeVisible();
  });
});