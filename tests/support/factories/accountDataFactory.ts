import { faker } from '@faker-js/faker'

export const generateAccount = (overrides = {}) => ({
  accountName: `AC_${faker.finance.accountName()}`,
  ...overrides // Allow custom overrides
});