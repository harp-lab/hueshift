const path = require('path');

module.exports = {
  rootDir: process.cwd(),
  setupFilesAfterEnv: [
    path.resolve(__dirname, 'setup.js')
  ]
};
