#!/usr/bin/env node
const childProcess = require('child_process');
const path = require('path');
const yargs = require('yargs');

const CLI_PATH = path.resolve(__dirname);
const HS_CONSTS_PATH = path.resolve(CLI_PATH, 'consts.js');
const NODEMON_PATH = path.resolve(CLI_PATH, 'nodemon.js');
const FRAMEWORK_PATH = path.resolve(CLI_PATH, '..');

const CONFIGS_PATH = path.resolve(FRAMEWORK_PATH, 'configs');
const WEBPACK_CONFIG_PATH = path.resolve(CONFIGS_PATH, 'webpack');
const JSDOC_CONFIG_PATH = path.resolve(CONFIGS_PATH, 'jsdoc.js');

const SERVER_PATH = path.resolve(FRAMEWORK_PATH, 'server');

/**
 * spawn child process
 * @param {Object} yargv yargv object
 * @param {String} command process command
 * @param {Array<String>} args process arguments
 * @param {Object} env process environment
 */
function spawn(yargv, command, args = [], env = {}) {
  const child = childProcess.spawn(
    command, args, {
      env: {
        ...process.env,
        HS_CONFIG: yargv.config,
        HS_CONSTS: HS_CONSTS_PATH,
        ...env,
      },
      stdio: 'inherit',
    },
  );

  process.on('SIGTERM', (signal) => child.kill(signal));
}

yargs /* eslint-disable-line no-unused-expressions */
  .command('start', 'start application', () => {}, (argv) => {
    spawn(argv, 'node', [SERVER_PATH]);
  })
  .command('build', 'build application', () => {}, (argv) => {
    spawn(argv, 'webpack', ['--config', WEBPACK_CONFIG_PATH], { HS_WEBPACK_MODE: 'production' });
  })
  .command('dev', 'start development environment', () => {}, (argv) => {
    // start dev server
    spawn(argv, 'node', [NODEMON_PATH]);

    // start dev client
    spawn(argv, 'webpack', ['serve', '--config', WEBPACK_CONFIG_PATH], { HS_WEBPACK_MODE: 'development' });
  })
  .command('docs', 'generate documentation', () => {}, (argv) => {
    spawn(argv, 'jsdoc', ['-c', JSDOC_CONFIG_PATH]);
  })
  .option('config', {
    alias: 'c',
    default: 'hueshift.config.js',
    describe: 'config file',
    type: 'string',
  })
  .argv;
