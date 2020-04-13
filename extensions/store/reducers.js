import { reqReduxReducer } from 'extensions/checks';
let reducers;
try {
  reducers = require('fext/store/reducers');
} catch(err) {
  reducers = {};
}

const path = 'fext/store/reducers';
export const metadataReducer = reqReduxReducer(reducers, 'metadataReducer', path);
