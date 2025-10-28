module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '..',
  testMatch: ['<rootDir>/prisma/__tests__/**/*.test.ts'],
  globalSetup: '<rootDir>/prisma/globalSetup.ts',
  globalTeardown: '<rootDir>/prisma/globalTeardown.ts',
};
