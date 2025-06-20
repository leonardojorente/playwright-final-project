import { type Locator, type Page } from '@playwright/test';

export class ToastComponent{
    readonly toastContainer: Locator;
    readonly toastMessage: (toastMessage: string) => Locator;

    constructor(page: Page) {
        this.toastContainer = page.locator('div[id="toast-container"]');
        this.toastMessage = (toastMessage: string) => this.toastContainer.getByText(`${toastMessage}`, { exact: false });
    }
}