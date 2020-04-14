import { reqObject } from 'extensions/checks';
import * as config from 'fext-config';

const path = 'fext/fext.config.js';
export const theme = reqObject(config, 'theme', path);
