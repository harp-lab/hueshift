const path = require('path');
const packageDir = path.resolve(__dirname).split('/node_modules')[0];
const fconfig = require(path.resolve(packageDir, 'framework.config.js'));

module.exports = {
  devServer: {
    proxy: {
      '/api': `http://${fconfig.SERVER_HOSTNAME}:${fconfig.SERVER_PORT}`
    }
  }
};
