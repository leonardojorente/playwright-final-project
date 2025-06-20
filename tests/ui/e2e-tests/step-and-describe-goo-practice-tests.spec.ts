import { expect, test } from '../fixtures/pages-fixture';
import  labelMessage  from '../../data/label-messages.json';
import { generateRandomString } from '../../support/utils';


test.describe('Tests using good practices', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC01 Add New Account', {tag: ['@regression']},  async ({ topMenuComponent, accountPage }) => {
    const randomAccountName = `accountName ${generateRandomString(3)}`
    
    await test.step('Navigate to Accounts Settings', async () => {
      await topMenuComponent.clickSettingsOption(labelMessage.TOP_MENU_COMPONENT.SETTINGS_OPTION_ACCOUNTS);
    });

    await test.step('Insert Account Name', async () => {
      await accountPage.insertAccountName(randomAccountName);
      await accountPage.clickSaveAccountButton();
    });

    await test.step('Verify that the account was inserted', async () => {
      await expect(accountPage.accountRowByAccountName(randomAccountName)).toBeVisible();
    })
  });
})



