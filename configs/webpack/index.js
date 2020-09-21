const { merge } = require('webpack-merge');
const path = require('path');

const { HS_CONSTS, HS_WEBPACK_MODE } = process.env;
const { fext } = require(HS_CONSTS);
const FEXT_WEBPACK_CONFIG = fext.webpack.config;

const WEBPACK_CONFIG_PATH = path.resolve(__dirname);
const BASE_CONFIG_PATH = path.resolve(WEBPACK_CONFIG_PATH, 'webpack.config');
const DEV_CONFIG_PATH = path.resolve(WEBPACK_CONFIG_PATH, 'webpack.dev');
const PROD_CONFIG_PATH = path.resolve(WEBPACK_CONFIG_PATH, 'webpack.prod');

const webpackConfigBase = require(BASE_CONFIG_PATH);
const webpackConfigDev = require(DEV_CONFIG_PATH);
const webpackConfigProd = require(PROD_CONFIG_PATH);

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
