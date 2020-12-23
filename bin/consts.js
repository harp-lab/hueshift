/* eslint-disable import/no-dynamic-require */
const path = require('path');

const { HS_CONFIG } = process.env;
exports.FRAMEWORK_PATH = path.resolve(__dirname, '..');
const { getObjectValue, reqAbsolutePath } = require(path.resolve(exports.FRAMEWORK_PATH, 'utilities'));

exports.PACKAGE_PATH = process.cwd();
exports.APP_PATH = path.resolve(exports.FRAMEWORK_PATH, 'app');
exports.EXTENSIONS_PATH = path.resolve(exports.FRAMEWORK_PATH, 'extensions');
exports.LIBRARY_PATH = path.resolve(exports.APP_PATH, 'library');
exports.STORE_PATH = path.resolve(exports.APP_PATH, 'store');
exports.COMPONENTS_PATH = path.resolve(exports.APP_PATH, 'components');
const EMPTY_MODULE_PATH = path.resolve(exports.EXTENSIONS_PATH, 'empty');

/**
 * check module exists
 * @param {String} modulePath
 * @returns {Boolean}
 */
function moduleExists(modulePath) {
  const absolutePath = reqAbsolutePath(modulePath);
  try {
    require(absolutePath); // eslint-disable-line global-require
    return true;
  } catch (err) {
    const { code } = err;
    if (code === 'MODULE_NOT_FOUND') {
      return false;
    }
    return true;
  }
}

/**
 * guarantee existing module path
 * @param {String} modulePath module path
 * @returns {String} module path
 */
function reqModule(modulePath) {
  if (moduleExists(modulePath)) {
    return modulePath;
  }
  return EMPTY_MODULE_PATH;
}

const defaults = require(path.resolve(exports.FRAMEWORK_PATH, 'configs', 'default.config.js'));
/**
 * get value from config with default values from 'default.config.js'
 * @param {Object} config
 * @param {(String|Array<String>)} path key path
 * @returns {*} value
 */
function getConfigValue(config, keyPath) {
  const defaultValue = getObjectValue(defaults, keyPath);
  return getObjectValue(config, keyPath, defaultValue);
}

const packageJsonPath = path.resolve(exports.PACKAGE_PATH, 'package.json');
exports.version = moduleExists(packageJsonPath) ? require(packageJsonPath).version : -1;

// read config and provide defaults
const frameworkConfigPath = reqAbsolutePath(HS_CONFIG || '');
const fconfig = moduleExists(frameworkConfigPath) ? require(frameworkConfigPath) : {};

let fext = {
  path: reqAbsolutePath(getConfigValue(fconfig, 'fext.path')),
  configPath: reqAbsolutePath(reqModule(getConfigValue(fconfig, 'fext.config'))),
};
fext.config = moduleExists(fext.configPath) ? require(fext.configPath) : {};
const webpackConfigPath = reqAbsolutePath(getConfigValue(fconfig, 'webpack.config'));
const { config: webpackConfig, headTemplate, bodyTemplate } = moduleExists(webpackConfigPath)
  ? require(webpackConfigPath) : {};
fext = {
  ...fext,
  layouts: reqAbsolutePath(reqModule(getConfigValue(fconfig, 'fext.layouts'))),
  store: {
    hooks: reqAbsolutePath(reqModule(getConfigValue(fconfig, 'fext.store.hooks'))),
    reducers: reqAbsolutePath(reqModule(getConfigValue(fconfig, 'fext.store.reducers'))),
  },
  webpack: {
    config: webpackConfig || {},
    build: reqAbsolutePath(getConfigValue(fconfig, 'webpack.build')),
    headTemplate: headTemplate ? headTemplate() : '',
    bodyTemplate: bodyTemplate ? bodyTemplate() : '',
  },
  engine: {
    disabled: !fext.config.engine,
    path: reqAbsolutePath(getConfigValue(fconfig, 'engine.path')),
  },
  server: {
    hostname: getConfigValue(fconfig, 'server.hostname'),
    port: getConfigValue(fconfig, 'server.port'),
  },
};
exports.fext = fext;
