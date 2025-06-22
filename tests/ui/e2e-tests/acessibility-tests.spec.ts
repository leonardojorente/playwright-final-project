import { test, expect } from '@tests/ui/fixtures/pages-fixture';
import AxeBuilder from '@axe-core/playwright';

// https://playwright.dev/docs/accessibility-testing
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('https://barrigareact.wcaquino.me');
});

test('TC01 acessibility test', {tag: ['@regression', '@smoke']},  async ({ page }) => {
  await test.step('Check acessibility with axe', async () => {
    const {violations} = await new AxeBuilder({ page }).analyze(); //retuns ONLY accessibility violations from the object
    expect(violations).toHaveLength(0); // Assert that there are no accessibility violations
  })
});

//https://github.com/GoogleChrome/lighthouse/blob/main/core/gather/gatherers/accessibility.js
//https://www.youtube.com/watch?v=cs5-Kk9nQDA&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc&index=23
test('TC02 light house acessibility test', {tag: ['@regression', '@smoke']},  async ({ page }, testinfo) => {
  await test.step('Check acessibility with axe', async () => {
    const {violations} = await new AxeBuilder({ page })
    .withTags(["wcag2a","wcag2aa"])
    .withRules([
      'accesskeys',
      'area-alt',
      'aria-allowed-role',
      'aria-braille-equivalent',
      'aria-conditional-attr',
      'aria-deprecated-role',
      'aria-dialog-name',
      'aria-prohibited-attr',
      'aria-roledescription',
      'aria-treeitem-name',
      'aria-text',
      'audio-caption',
      'blink',
      'duplicate-id',
      //'empty-heading',
      'frame-focusable-content',
      'frame-title-unique',
      'heading-order',
      'html-xml-lang-mismatch',
      'identical-links-same-purpose',
      'image-redundant-alt',
      'input-button-name',
      //'label-content-name-mismatch',
      'landmark-one-main',
      'link-in-text-block',
      'marquee',
      'meta-viewport',
      'nested-interactive',
      'no-autoplay-audio',
      'role-img-alt',
      'scrollable-region-focusable',
      'select-name',
      'server-side-image-map',
      'skip-link',
      'summary-name',
      'svg-img-alt',
      'tabindex',
      'table-duplicate-name',
      'table-fake-caption',
      'target-size',
      'td-has-header'
    ])
    .analyze();
    await testinfo.attach('Acessibility Violations', {
      body: JSON.stringify(violations, null, 2),
        contentType: 'application/json'
    });
    expect(violations).toHaveLength(1);
  })
});