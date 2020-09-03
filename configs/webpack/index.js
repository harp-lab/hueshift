const { merge } = require('webpack-merge');
const path = require('path');

const { HS_CONSTS, HS_WEBPACK_MODE } = process.env;
const { fext } = require(HS_CONSTS);
const FEXT_WEBPACK_CONFIG = fext.webpack.config;

const WEBPACK_CONFIG_PATH = path.resolve(__dirname);
const BASE_CONFIG_PATH = path.resolve(WEBPACK_CONFIG_PATH, 'config.base.js');
const DEV_CONFIG_PATH = path.resolve(WEBPACK_CONFIG_PATH, 'config.dev.js');
const PROD_CONFIG_PATH = path.resolve(WEBPACK_CONFIG_PATH, 'config.prod.js');

let config;
switch (HS_WEBPACK_MODE) {
  case 'development':
    config = require(DEV_CONFIG_PATH);
    break;
  case 'production':
    config = require(PROD_CONFIG_PATH);
    break;
}

module.exports = merge(require(BASE_CONFIG_PATH), config, FEXT_WEBPACK_CONFIG);
