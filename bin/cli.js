#!/usr/bin/env node
const child_process = require('child_process');
const path = require('path');
const yargs = require('yargs');

const CLI_PATH = path.resolve(__dirname);
const NODEMON_PATH = path.resolve(CLI_PATH, 'nodemon.js');
const FRAMEWORK_PATH = path.resolve(CLI_PATH, '..');
const SERVER_PATH = path.resolve(FRAMEWORK_PATH, 'server');
const WEBPACK_CONFIG_PATH = path.resolve(FRAMEWORK_PATH, 'webpack.config.js');
const JSDOC_CONFIG_PATH = path.resolve(FRAMEWORK_PATH, 'jsdoc.config.js');

const NODE_MODULES_BIN_PATH = path.resolve(FRAMEWORK_PATH, 'node_modules', '.bin');
const WEBPACK_BIN_PATH = path.resolve(NODE_MODULES_BIN_PATH, 'webpack');
const JSDOC_BIN_PATH = path.resolve(NODE_MODULES_BIN_PATH, 'jsdoc');
const WEBPACK_DEV_SERVER_PATH = path.resolve(NODE_MODULES_BIN_PATH, 'webpack-dev-server');

/**
 * spawn child process
 * @param {Object} yargv yargv object
 * @param {String} command process command
 * @param {Array<String>} args process arguments
 * @param {Object} env process environment
 */
function spawn(yargv, command, args = [], env = {}) {
  child_process.spawn(
    command, args, {
      env: {
        ...process.env,
        HS_CONFIG: yargv.config,
        ...env
      },
      stdio: 'inherit'
    });
}

yargs
  .command('start', 'start application', () => {}, function(argv) {
    spawn(argv, 'node', [SERVER_PATH]);
  })
  .command('build', 'build application', () => {}, function(argv) {
    spawn(argv, 'node', [WEBPACK_BIN_PATH, '--config', WEBPACK_CONFIG_PATH], { HS_WEBPACK_MODE: 'production' });
  })
  .command('dev', 'start development environment', () => {}, function(argv) {
    // start dev server
    spawn(argv, 'node', [NODEMON_PATH]);

    // start dev client
    spawn(argv, 'node', [WEBPACK_DEV_SERVER_PATH, '--config', WEBPACK_CONFIG_PATH], { HS_WEBPACK_MODE: 'development' });
  })
  .command('docs', 'generate documentation', () => {}, function(argv) {
    spawn(argv, 'node', [JSDOC_BIN_PATH, '-c', JSDOC_CONFIG_PATH]);
  })
  .option('config', {
    alias: 'c',
    default: 'hueshift.config.js',
    describe: 'config file',
    type: 'string'
  })
  .argv;
