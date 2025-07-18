import { test as teardown, expect } from '@tests/ui/fixtures/pages-fixture';
import { ResetRequests } from '@tests/api/api-requests/reset-requests';

teardown('reset app using API', async ({ request }) => {
  console.log('reseting app using API...');
  const resetRequests = new ResetRequests(request)
  const response = await resetRequests.resetAppData()

  expect(response.status()).toBe(200);
});