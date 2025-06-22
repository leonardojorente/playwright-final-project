import { test as base } from '@playwright/test';
import { LoginPage } from '@tests/ui/pages/login-page';
import { AccountPage } from '@tests/ui/pages/account-page';
import { ToastComponent } from '@tests/ui/pages/components/toast-component';
import { TopMenuComponent } from '@tests/ui/pages/components/top-menu-component';
import { logConsoleErrorMessages } from '@tests/support/utils';

type PagesFixtures = {
  loginPage: LoginPage;
  appLogin: LoginPage;
  accountPage: AccountPage;
  toastComponent: ToastComponent;
  topMenuComponent: TopMenuComponent;
}

export const test = base.extend<PagesFixtures>({
  page: async ({ page }, use) => {
    //deal with javascript error messages in the console
    //if you want to interrupt the test when an error is found, set the second parameter to true
    logConsoleErrorMessages(page, true);
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  appLogin: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  toastComponent: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
  topMenuComponent: async ({ page }, use) => {
    await use(new TopMenuComponent(page));
  }
});

export { expect } from '@playwright/test';