const { SERVER_HOSTNAME, SERVER_PORT } = require('../consts.js');

module.exports = {
  devServer: {
    proxy: {
      '/api': `http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    }
  }
};
