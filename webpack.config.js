const path = require('path');
const merge = require('webpack-merge');
const packageDir = path.resolve(__dirname).split('/node_modules')[0];
const fconfig = require(path.resolve(packageDir, 'framework.config.js'));

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

const { config: fextWebpackConfig } = require(fconfig.WEBPACK_CONFIG);

module.exports = merge(require('./webpack/config.base.js'), config, fextWebpackConfig);
