const { HS_CONSTS } = process.env;
const { SERVER_HOSTNAME, SERVER_PORT } = require(HS_CONSTS);

module.exports = {
  devServer: {
    proxy: {
      '/api': `http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    }
  }
};
