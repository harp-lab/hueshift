const path = require('path');
const chalk = require('chalk');
const nodemon = require('nodemon');

const { HS_CONSTS } = process.env;
const { PACKAGE_PATH, FRAMEWORK_PATH } = require(HS_CONSTS); // eslint-disable-line import/no-dynamic-require

const SERVER_DIR = path.resolve(FRAMEWORK_PATH, 'server');
const NODEMON_LOG_TAG = chalk.blackBright('[ndm]');

/**
 * @param {String} content message content
 */
function consoleLog(content) {
  const symbol = chalk.blue('i');
  const tag = `${symbol} ${NODEMON_LOG_TAG}`;
  console.log(`${tag} ${content}`); // eslint-disable-line no-console
}

/**
 * @param {String} content message content
 */
function consoleError(content) {
  const symbol = chalk.red('!');
  const tag = `${symbol} ${NODEMON_LOG_TAG}`;
  const error = chalk.redBright('[error]');
  console.error(`${tag} ${content} ${error}`); // eslint-disable-line no-console
}

// create nodemon instance
const devServer = nodemon({
  script: path.resolve(SERVER_DIR),
  delay: '1500',
  watch: [
    SERVER_DIR,
  ],
  ignore: [
    path.resolve(SERVER_DIR, 'data'),
  ],
  env: {
    NODE_ENV: 'development',
  },
  quiet: true,
});
devServer.on('start', () => consoleLog('server started'));
devServer.on('crash', () => consoleError('server crashed'));
devServer.on('restart', (files) => {
  let message = 'server restarting...';
  message += files.map((filePath) => {
    const relPath = `./${path.relative(PACKAGE_PATH, filePath)}`;
    const coloredPath = chalk.bold(relPath);
    return `\n  ${coloredPath}`;
  }).join('');
  consoleLog(message);
});
devServer.on('quit', () => {
  process.exit();
});

consoleLog('monitor started');
