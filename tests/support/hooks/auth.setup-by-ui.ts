import { test as setup, expect } from '../../ui/fixtures/pages-fixture';

//adm user
const userName = process.env.USER!
const password = process.env.PASSWORD!
const authenticatedUserPathFile = '.auth/authenticated-user.json';

setup('authenticate by UI', async ({ page, loginPage, toastComponent }) => {
    await page.goto('/');
    await loginPage.loginWebApp(userName, password);
  
    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(`Bem vindo`)).toBeVisible();

    await page.context().storageState({ path: authenticatedUserPathFile });
});