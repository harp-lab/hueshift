const base = require('./config.base');

const config = {
  ...base,
  testMatch: ['**/(*.)+unit.test.js'],
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
    },
  ],
};
