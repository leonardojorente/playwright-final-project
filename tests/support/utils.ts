import { Page } from "@playwright/test";
import { faker } from '@faker-js/faker'

export const generateRandomAlphaNumericString = (length: number) =>{
    return faker.string.alphanumeric(length)
}

export const generateRandomString = (length: number) => {
    return faker.string.alpha(length)
}

export const generateRandomNumberString = (length: number) => {
    return faker.string.numeric(length)
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