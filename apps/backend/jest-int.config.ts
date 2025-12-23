import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(readFileSync(join(__dirname, '.spec.swcrc'), 'utf-8'));

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

export default {
  displayName: '@product-base/backend-integration',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts', '<rootDir>/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
    '^.+\\.mjs$': ['@swc/jest', swcJestConfig]
  },
  /**
   * Transform ESM packages - both .mjs files and .js files from specific ESM packages
   *  This includes better-auth and its dependencies that use ESM syntax
   */
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@noble|better-auth|better-call|@better-auth|rou3|jose)/)'
  ],
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
  coverageDirectory: 'test-output/jest/coverage-int'
};
