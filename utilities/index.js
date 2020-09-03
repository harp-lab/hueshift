const path = require('path');

/**
 * get value from object given key path
 * @param {Object} object data object
 * @param {(String|Array<String>)} keyPath key path
 * @param {*} defaultValue default value
 * @returns {*} value
 */
exports.getObjectValue = function getObjectValue(object, keyPath, defaultValue) {
  let keyArray;
  if (typeof keyPath === 'string') {
    keyArray = keyPath.split('.');
  } else if (keyPath instanceof Array) {
    keyArray = keyPath;
  }

  const [key, ...remKeyArray] = keyArray;
  const value = object[key];
  if (value) {
    if (remKeyArray.length === 0) {
      return value;
    }
    return exports.getObjectValue(value, remKeyArray, defaultValue);
  }
  return defaultValue;
};

/**
 * convert relative path to absolute path with package path as base
 * @param {String} relativePath relative path
 * @returns {String} absolute path
 */
exports.reqAbsolutePath = function reqAbsolutePath(relativePath) {
  if (path.isAbsolute(relativePath)) { return relativePath; }

  return path.resolve(relativePath);
};
