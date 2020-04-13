const path = require('path');
const chalk = require('chalk');
const { PACKAGE_PATH } = require('../consts.js');
const {
  ROOT_DIR, ENGINE_DIR, BUILD_DIR,
  SERVER_HOSTNAME, SERVER_PORT,
  FEXT_CONFIG
} = require(path.resolve(PACKAGE_PATH, 'framework.config.js'));
const fext = require(FEXT_CONFIG);

// environment
exports.ENV = process.env.NODE_ENV || 'production';
if (exports.ENV == 'development') {
  exports.INIT_DATA = false;
} else {
  exports.INIT_DAtA = false;
}

// path
exports.ROOT_DIR = ROOT_DIR;
exports.ENGINE_DIR = ENGINE_DIR;
exports.BUILD_DIR = BUILD_DIR;
exports.SERVER_DIR = __dirname;
exports.DATA_DIR = path.resolve(exports.SERVER_DIR, 'data');
exports.INPUT_DIR = path.resolve(exports.DATA_DIR, 'input');
exports.OUTPUT_DIR = path.resolve(exports.DATA_DIR, 'output');
exports.SAVE_DIR = path.resolve(exports.DATA_DIR, 'save');

exports.fext = fext;
exports.ENGINE_DISABLED = !fext.engine;

// server
exports.HOSTNAME = SERVER_HOSTNAME;
exports.PORT = SERVER_PORT;

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
