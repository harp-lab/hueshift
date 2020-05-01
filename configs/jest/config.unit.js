const base = require('./config.base');

module.exports = {
  ...base,
  testMatch: ['**/(*.)+unit.test.js']
};
