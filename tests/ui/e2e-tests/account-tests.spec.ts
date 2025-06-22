import { test, expect } from '@tests/ui/fixtures/pages-fixture';
import  labelMessage  from '@tests/data/label-messages.json';
import { generateRandomString } from '@tests/support/utils';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('TC01 Add New Account', {tag: ['@regression']},  async ({ topMenuComponent, accountPage }) => {
  const randomAccountName = `accountName ${generateRandomString(3)}`
  
  await topMenuComponent.clickSettingsOption(labelMessage.TOP_MENU_COMPONENT.SETTINGS_OPTION_ACCOUNTS);
  await accountPage.insertAccountName(randomAccountName);
  await accountPage.clickSaveAccountButton();

  // Expect account row to be added
  await expect(accountPage.accountRowByAccountName(randomAccountName)).toBeVisible();
});
