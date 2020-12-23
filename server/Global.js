const chalk = require('chalk');

const { SERVER_LOG_TAG, LOG_TYPE_PROJ, LOG_TYPE_SYS } = require('./Consts');

exports.consoleLog = function consoleLog(type, content) {
  const symbol = chalk.blue('i');
  const tag = `${symbol} ${SERVER_LOG_TAG}`;
  const msgTag = messageTag(type);
  const msgContent = messageContent(type, content);
  console.log(`${tag} ${msgContent} ${msgTag}`); // eslint-disable-line no-console
};

exports.consoleError = function consoleError(type, content) {
  const symbol = chalk.red('!');
  const tag = `${symbol} ${SERVER_LOG_TAG}`;
  const msgTag = messageTag(type);
  const msgContent = messageContent(type, content);
  const error = chalk.redBright('[error]');
  console.error(`${tag} ${msgContent} ${msgTag} ${error}`); // eslint-disable-line no-console
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
