const config = require('./jest.config.base');

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
