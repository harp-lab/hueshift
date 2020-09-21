const { merge } = require('webpack-merge');

const { HS_CONSTS, HS_WEBPACK_MODE } = process.env;
const { fext } = require(HS_CONSTS); /* eslint-disable-line import/no-dynamic-require */
const FEXT_WEBPACK_CONFIG = fext.webpack.config;

const webpackConfigBase = require('./webpack.config');
const webpackConfigDev = require('./webpack.dev');
const webpackConfigProd = require('./webpack.prod');

let config;
switch (HS_WEBPACK_MODE) {
  case 'development':
    config = webpackConfigDev;
    break;
  case 'production':
  default:
    config = webpackConfigProd;
    break;
}

module.exports = merge(webpackConfigBase, config, FEXT_WEBPACK_CONFIG);
