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

// read config and provide defaults
const frameworkConfigPath = convertPath(exports.PACKAGE_PATH, process.env.hs_config);
const fconfig = moduleExists(frameworkConfigPath) ? require(frameworkConfigPath) : {};
const {
  fext = {},
  engine = {},
  webpack = {},
  server = {}
} = fconfig;
const FEXT_PATH = fext.path || 'fext';
const FEXT_CONFIG = fext.config || path.join(FEXT_PATH, 'fext.config.js');
const ENGINE_PATH = engine.path || path.join(FEXT_PATH, 'engine');
const WEBPACK_CONFIG = webpack.config || path.join(FEXT_PATH, 'webpack.config.js');
const WEBPACK_BUILD = webpack.build || 'build';
const SERVER_HOSTNAME = server.hostname || 'localhost';
const SERVER_PORT = server.port || 8086;

exports.FEXT_PATH = convertPath(exports.PACKAGE_PATH, FEXT_PATH);
exports.FEXT_CONFIG_PATH = convertPath(exports.PACKAGE_PATH, FEXT_CONFIG);
exports.FEXT_CONFIG = moduleExists(exports.FEXT_CONFIG_PATH) ? require(exports.FEXT_CONFIG_PATH) : {};
const fextWebpackConfigPath = convertPath(exports.PACKAGE_PATH, WEBPACK_CONFIG);
const { config: fextWebpackConfig } = moduleExists(fextWebpackConfigPath) ? require(fextWebpackConfigPath) : {};
exports.FEXT_WEBPACK_CONFIG = fextWebpackConfig || {};

exports.BUILD_PATH = convertPath(exports.PACKAGE_PATH, WEBPACK_BUILD);

exports.ENGINE_DISABLED = !exports.FEXT_CONFIG.engine;
exports.ENGINE_PATH = convertPath(exports.PACKAGE_PATH, ENGINE_PATH);

exports.SERVER_HOSTNAME = SERVER_HOSTNAME;
exports.SERVER_PORT = SERVER_PORT;
