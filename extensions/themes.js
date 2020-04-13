import { reqObject } from 'extensions/checks';
let config;
try {
  config = require('fext/fext.config.js');
} catch(err) {
  config = {};
}

const path = 'fext/fext.config.js';
export const theme = reqObject(config, 'theme', path);
