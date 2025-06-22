import { Page } from '@playwright/test';
import { test, expect } from '@tests/ui/fixtures/pages-fixture';

const userName = 'cypresstest@gmail.com'
const password = 'cypress'

async function getFullFillResponse(page: Page) {
    return page.waitForResponse(response =>
  response.url().includes('/signin') && response.status() === 200
      && response.request().method() === 'POST'
  );
};

//https://playwright.dev/docs/api/class-page#page-wait-for-response
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('https://barrigareact.wcaquino.me');
});

test('TC01 Assert a specific API response', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent, page }) => {
  
  await loginPage.insertEmail(userName)
  await loginPage.insertPassword(password)

  /*start to listening and wait for the response*/
  const responsePromise = getFullFillResponse(page);
  //action that will trigger the API call
  await loginPage.clickSignInButton()

  const response = await responsePromise;
  /*********************************************/
  const responseBody = await response.json();
  console.log(responseBody);
  console.log(response.status());

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage(`Bem vindo, ${responseBody.nome}!`)).toBeVisible();
});