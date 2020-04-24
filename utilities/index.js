const path = require('path');

/**
 * get value from object given key path
 * @param {Object} object data object
 * @param {(String|Array<String>)} path key path
 * @param {*} defaultValue default value
 * @returns {*} value
 */
exports.getObjectValue = function(object, path, defaultValue) {
  let keyArray;
  if (typeof path === 'string') {
    keyArray = path.split('.');
  } else if (path instanceof Array) {
    keyArray = path;
  }

  const [key, ...remKeyArray] = keyArray;
  let value = object[key];
  if (value) {
    if (remKeyArray.length === 0) {
      return value;
    } else {
      return exports.getObjectValue(value, remKeyArray, defaultValue);
    }
  } else {
    return defaultValue;
  }
}

/**
 * convert relative path to absolute path with package path as base
 * @param {String} relativePath relative path
 * @returns {String} absolute path
 */
exports.reqAbsolutePath = function(relativePath) {
  if (path.isAbsolute(relativePath))
    return relativePath;

  return path.resolve(relativePath);
}
