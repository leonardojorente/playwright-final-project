import { expect, test } from '../fixtures/pages-fixture';
import  labelMessage from '../../data/label-messages.json';

const userName = 'cypresstest@gmail.com'
const password = 'cypress'

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('https://barrigareact.wcaquino.me');
});

test('TC01 Success Login', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
  await loginPage.insertEmail(userName)
  await loginPage.insertPassword(password)
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage(labelMessage.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();
});