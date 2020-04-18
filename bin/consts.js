const path = require('path');
const { HS_CONFIG } = process.env;

exports.FRAMEWORK_PATH = path.resolve(__dirname, '..');
exports.PACKAGE_PATH = exports.FRAMEWORK_PATH.split('/node_modules')[0];
exports.APP_PATH = path.resolve(exports.FRAMEWORK_PATH, 'app');
exports.EXTENSIONS_PATH = path.resolve(exports.FRAMEWORK_PATH, 'extensions');
exports.LIBRARY_PATH = path.resolve(exports.APP_PATH, 'library');
exports.STORE_PATH = path.resolve(exports.APP_PATH, 'store');
exports.COMPONENTS_PATH = path.resolve(exports.APP_PATH, 'components');

/**
 * check module exists
 * @param {String} modulePath 
 * @returns {Boolean}
 */
function moduleExists(modulePath) {
  try {
    require(modulePath);
    return true;
  } catch(err) {
    return false;
  }
}

/**
 * convert relative path to absolute path with package path as base
 * @param {String} relativePath relative path
 * @returns {String} absolute path
 */
function convertPath(relativePath) {
  if (path.isAbsolute(relativePath))
    return relativePath;

  return path.resolve(exports.PACKAGE_PATH, relativePath);
}

/**
 * get value from object given key path
 * @param {Object} object data object
 * @param {(String|Array<String>)} path key path
 * @param {*} defaultValue default value
 */
function getValue(object, path, defaultValue) {
  let keyArray;
  if (typeof path === 'string') {
    keyArray = path.split('.');
  } else if (path instanceof Array) {
    keyArray = path;
  }

  const [key, ...remKeyArray] = keyArray;
  const value = object[key];
  if (remKeyArray.length === 0) {
    return value;
  } else {
    if (value) {
      return getValue(value, remKeyArray, defaultValue);
    } else {
      return defaultValue;
    }
  }
}

// read config and provide defaults
const frameworkConfigPath = convertPath(HS_CONFIG);
const fconfig = moduleExists(frameworkConfigPath) ? require(frameworkConfigPath) : {};
const FEXT_PATH = getValue(fconfig, 'fext.path', 'fext');
const FEXT_CONFIG_PATH = getValue(fconfig, 'fext.config', path.join(FEXT_PATH, 'fext.config.js'));
const ENGINE_PATH = getValue(fconfig, 'engine.path', path.join(FEXT_PATH, 'engine'));
const WEBPACK_CONFIG_PATH = getValue(fconfig, 'webpack.config', path.join(FEXT_PATH, 'webpack.config.js'));
const WEBPACK_BUILD_PATH = getValue(fconfig, 'webpack.build', 'build');
const SERVER_HOSTNAME = getValue(fconfig, 'server.hostname', 'localhost');
const SERVER_PORT = getValue(fconfig, 'server.port', 8086);

exports.FEXT_PATH = convertPath(FEXT_PATH);
exports.FEXT_CONFIG_PATH = convertPath(FEXT_CONFIG_PATH);
exports.FEXT_CONFIG = moduleExists(exports.FEXT_CONFIG_PATH) ? require(exports.FEXT_CONFIG_PATH) : {};
const fextWebpackConfigPath = convertPath(WEBPACK_CONFIG_PATH);
const { config: fextWebpackConfig } = moduleExists(fextWebpackConfigPath) ? require(fextWebpackConfigPath) : {};
exports.FEXT_WEBPACK_CONFIG = fextWebpackConfig || {};

exports.BUILD_PATH = convertPath(WEBPACK_BUILD_PATH);

exports.ENGINE_DISABLED = !exports.FEXT_CONFIG.engine;
exports.ENGINE_PATH = convertPath(ENGINE_PATH);

exports.SERVER_HOSTNAME = SERVER_HOSTNAME;
exports.SERVER_PORT = SERVER_PORT;
