import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';

//set .env path
const dotEnvPath = process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env'
// Read from ".env" file.
dotenv.config({ 
  path: path.resolve(__dirname, dotEnvPath),
  override:true 
});

export default defineConfig({
  globalSetup: './tests/support/global-setup.ts',
  globalTeardown: './tests/support/global-teardown.ts',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL_WEB!,
    screenshot:'only-on-failure', 
    //locale: 'it-IT', //it will effect navigator.language value, Accept-Language request header value
    headless: true,
    trace: 'retain-on-first-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup-by-ui', testMatch: '**/*.setup-by-ui.ts' },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: '.auth/authenticated-user.json',
       },
      
      dependencies: ['setup-by-ui'], // Ensure setup is done before running tests
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
