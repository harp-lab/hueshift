const base = require('./jest.config.base');

const config = {
  ...base,
  testMatch: ['<rootDir>/**/*.unit.test.js'],
};

module.exports = {
  projects: [
    {
      displayName: 'test',
      ...config,
    },
  ],
};
