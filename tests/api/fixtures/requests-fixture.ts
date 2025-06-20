import { test as base } from '@playwright/test';
import extendPlaywrightPerformance, {PerformanceOptions, PerformanceWorker, PlaywrightPerformance} from "playwright-performance"; 

export const test = base.extend<PlaywrightPerformance, PerformanceOptions & PerformanceWorker>(extendPlaywrightPerformance());

export { expect } from '@playwright/test';