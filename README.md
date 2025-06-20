Config of MCP server
    1-Add extension Github Copilot
    2-Press Ctrl+Shift+P
    3-Preferences: Open User Settings (JSON)

Set .env
    1-npm i dotenv
    2-config at playwright.config.ts

Set cross-env between .env
    1-npm i cross-env
    2-check .env and package.json to understand better

Set acessibility tests
    1-npm i @axe-core/playwright
    2-https://playwright.dev/docs/accessibility-testing

set performance response time tests
    1-npm install playwright-performance --save-dev
    2-check the api fixture and the respective time response test

set json schema validator ajv
    1-npm i ajv@7.0.4

set lint:
    1-https://www.youtube.com/watch?v=3gT7LuzqOAk&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc&index=16
    2-npm install --save-dev typescript
    3-npx tsc --init //generate the typecript config file