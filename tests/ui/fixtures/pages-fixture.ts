import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AccountPage } from '../pages/account-page';
import { ToastComponent } from '../pages/components/toast-component';
import { TopMenuComponent } from '../pages/components/top-menu-component';
import { logConsoleErrorMessages } from '../../support/utils';

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