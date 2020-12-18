const path = require('path');

const config = {
  moduleNameMapper: {
    '^extensions/(.*)': '<rootDir>/extensions/$1',
    '^components/(.*)': '<rootDir>/app/components/$1',
    '^library/(.*)': '<rootDir>/app/library/$1',
    '^store/(.*)': '<rootDir>/app/store/$1',
  },
  rootDir: process.cwd(),
  setupFilesAfterEnv: [
    path.resolve(__dirname, 'jest.setup'),
  ],
  testPathIgnorePatterns: [
    'node_modules',
  ],
  transform: { '^.+\\.jsx?$': '<rootDir>/configs/jest/jest.transform.js' },
};

module.exports = {
  projects: [
    {
      displayName: 'test',
      ...config,
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      ...config,
      testMatch: [
        '<rootDir>/**/*.{js,jsx}',
      ],
    },
  ],
};
