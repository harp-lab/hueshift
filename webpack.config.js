const merge = require('webpack-merge');
const { FEXT_WEBPACK_CONFIG } = require('./consts.js');

const { fenv } = process.env;
let config;
switch (fenv) {
  case 'development':
    config = require('./webpack/config.dev.js')
    break;
  case 'production':
    config = require('./webpack/config.prod.js')
    break;
}

module.exports = merge(require('./webpack/config.base.js'), config, FEXT_WEBPACK_CONFIG);
