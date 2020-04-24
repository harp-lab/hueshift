const { HS_CONSTS } = process.env;
const { fext } = require(HS_CONSTS);

module.exports = {
  devServer: {
    proxy: {
      '/api': `http://${fext.server.hostname}:${fext.server.port}`
    }
  }
};
