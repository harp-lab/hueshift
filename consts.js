const path = require('path');

exports.FRAMEWORK_PATH = path.resolve(__dirname);
exports.PACKAGE_PATH = exports.FRAMEWORK_PATH.split('/node_modules')[0];
