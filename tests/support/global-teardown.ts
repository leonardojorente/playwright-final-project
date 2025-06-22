import { request as playwrightRequest } from '@playwright/test';
import { ResetRequests } from '@tests/api/api-requests/reset-requests';

async function globalTeardown() {
   const request = await playwrightRequest.newContext();
    console.log(`works as after all hook, only one function`);
    console.log('reseting app using API...');
    const resetRequests = new ResetRequests(request)
    const response = await resetRequests.resetAppData();

    // Check if the response status is 200 (OK)
    if (response.status() !== 200) {
        throw new Error(`Login failed with status ${response.status()}`);
    }
  }
  
  export default globalTeardown;