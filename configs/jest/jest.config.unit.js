const base = require('./jest.config.base');

const config = {
  ...base,
  testMatch: ['<rootDir>/**/*.test.js'],
  testPathIgnorePatterns: base.testPathIgnorePatterns.concat([
    'tests',
  ]),
};

module.exports = {
  projects: [
    {
      displayName: 'test',
      ...config,
    },
  ],
};
