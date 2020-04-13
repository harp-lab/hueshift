const path = require('path');
const { PACKAGE_PATH } = require('../consts.js');
const { SERVER_HOSTNAME, SERVER_PORT } = require(path.resolve(PACKAGE_PATH, 'framework.config.js'));

module.exports = {
  devServer: {
    proxy: {
      '/api': `http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    }
  }
};
