const { HS_CONSTS } = process.env;
const { fext } = require(HS_CONSTS); /* eslint-disable-line import/no-dynamic-require */
const ESLintPlugin = require('eslint-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  mode: 'development',
  devServer: {
    proxy: {
      '/api': `http://${fext.server.hostname}:${fext.server.port}`,
    },
  },
  plugins: [
    new ESLintPlugin(),
  ],
};
