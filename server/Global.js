const chalk = require('chalk');

const { SERVER_LOG_TAG, LOG_TYPE_PROJ, LOG_TYPE_SYS } = require('./Consts');

exports.consoleLog = function consoleLog(type, content) {
  const symbol = chalk.blue('i');
  const tag = `${symbol} ${SERVER_LOG_TAG}`;
  const msgTag = messageTag(type);
  const msgContent = messageContent(type, content);
  /* eslint-disable no-console */
  console.log(`${tag} ${msgContent} ${msgTag}`);
};

exports.consoleError = function consoleError(type, content) {
  const symbol = chalk.red('!');
  const tag = `${symbol} ${SERVER_LOG_TAG}`;
  const msgTag = messageTag(type);
  const msgContent = messageContent(type, content);
  const error = chalk.redBright('[error]');
  /* eslint-disable no-console */
  console.error(`${tag} ${msgContent} ${msgTag} ${error}`);
};

function messageTag(type) {
  let tag;
  switch (type) {
    case LOG_TYPE_PROJ:
      tag = chalk.greenBright(`[${LOG_TYPE_SYS}]`);
      break;
    default:
      tag = chalk.greenBright(`[${type}]`);
      break;
  }
  return tag;
}

function messageContent(type, content) {
  let newContent;
  switch (type) {
    case LOG_TYPE_PROJ:
      newContent = `project ${content}`;
      break;
    default:
      newContent = `${content}`;
      break;
  }
  return newContent;
}
