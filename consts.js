const path = require('path');

exports.FRAMEWORK_PATH = path.resolve(__dirname);
exports.PACKAGE_PATH = exports.FRAMEWORK_PATH.split('/node_modules')[0];

/**
 * Check module exists
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

const frameworkConfigPath = path.resolve(exports.PACKAGE_PATH, 'framework.config.js');
const fconfig = moduleExists(frameworkConfigPath) ? require(frameworkConfigPath) : {};
const {
  FEXT_DIR = 'fext',
  BUILD_DIR = 'build',
  ENGINE_DIR = 'engine',
  FEXT_CONFIG = 'fext.config.js',
  SERVER_HOSTNAME = 'localhost',
  SERVER_PORT = 8086,
  WEBPACK_CONFIG = 'webpack.config.js'
} = fconfig;

/**
 * Convert relative path to absolute path
 * @param {String} basePath base path
 * @param {String} relativePath relative path
 * @returns {String} absolute path
 */
function convertPath(basePath, relativePath) {
  if (path.isAbsolute(relativePath))
    return relativePath;

  return path.resolve(basePath, relativePath);
}

exports.FEXT_PATH = convertPath(exports.PACKAGE_PATH, FEXT_DIR);
exports.FEXT_CONFIG_PATH = convertPath(exports.FEXT_PATH, FEXT_CONFIG);
exports.FEXT_CONFIG = moduleExists(exports.FEXT_CONFIG_PATH) ? require(exports.FEXT_CONFIG_PATH) : {};
const fextWebpackConfigPath = convertPath(exports.FEXT_PATH, WEBPACK_CONFIG);
const { config: fextWebpackConfig } = moduleExists(fextWebpackConfigPath) ? require(fextWebpackConfigPath) : {};
exports.FEXT_WEBPACK_CONFIG = fextWebpackConfig || {};

exports.BUILD_PATH = convertPath(exports.PACKAGE_PATH, BUILD_DIR);

exports.ENGINE_DISABLED = !exports.FEXT_CONFIG.engine;
exports.ENGINE_PATH = convertPath(exports.FEXT_PATH, ENGINE_DIR);

exports.SERVER_HOSTNAME = SERVER_HOSTNAME;
exports.SERVER_PORT = SERVER_PORT;
