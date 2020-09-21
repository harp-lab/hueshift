const path = require('path');
const chalk = require('chalk');

const { HS_CONSTS } = process.env;
const {
  PACKAGE_PATH,
  fext,
} = require(HS_CONSTS); /* eslint-disable-line import/no-dynamic-require */
const FEXT_CONFIG = fext.config;

// environment
exports.ENV = process.env.NODE_ENV || 'production';
if (exports.ENV === 'development') {
  exports.INIT_DATA = false;
} else {
  exports.INIT_DAtA = false;
}

// path
exports.ROOT_DIR = PACKAGE_PATH;
exports.ENGINE_DIR = fext.engine.path;
exports.BUILD_DIR = fext.webpack.build;
exports.SERVER_DIR = __dirname;
exports.DATA_DIR = path.resolve(exports.SERVER_DIR, 'data');
exports.INPUT_DIR = path.resolve(exports.DATA_DIR, 'input');
exports.OUTPUT_DIR = path.resolve(exports.DATA_DIR, 'output');
exports.SAVE_DIR = path.resolve(exports.DATA_DIR, 'save');

exports.fext = FEXT_CONFIG;
exports.ENGINE_DISABLED = fext.engine.disabled;

// server
exports.HOSTNAME = fext.server.hostname;
exports.PORT = fext.server.port;

// log
exports.SERVER_LOG_TAG = chalk.blackBright('[srv]');
exports.INIT_LOG_TYPE = 'init';
exports.DATA_LOG_TYPE = 'data';
exports.ENGINE_LOG_TYPE = 'engi';
exports.LOG_TYPE_HTTP = 'http';
exports.LOG_TYPE_SYS = 'syst';
exports.LOG_TYPE_PROJ = 'proj';
exports.LOG_TYPE_WATCHER = 'wtch';

// watcher
exports.WATCHER_PATH = path.resolve(__dirname, 'watcher.js');
exports.WATCHER_ACTION_PROCESS = 'process';
exports.WATCHER_ACTION_CANCEL = 'cancel';
