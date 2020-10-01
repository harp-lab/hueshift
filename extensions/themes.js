import { reqObject } from 'extensions/checks';
import * as config from 'fext-config';

const path = 'fext/fext.config.js';

/* eslint-disable-next-line import/prefer-default-export */
export const theme = reqObject(config, 'theme', path);
