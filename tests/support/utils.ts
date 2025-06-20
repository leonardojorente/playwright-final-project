import { Page } from "@playwright/test";

export const generateRandomString = (length: number) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
        
    return result;
}

// Listen for all console events and handle errors
export const logConsoleErrorMessages = (page: Page, interruptTest: boolean) => {
    page.on('console', msg => {
        if (msg.type() === 'error' && interruptTest) {
            throw new Error(`Console error detected: ${msg.text()}`);
        }
        if (msg.type() === 'error' && !interruptTest) {
            console.log(`CONSOLE LOG ERROR: "${msg.text()}"`); 
        }
    });
}