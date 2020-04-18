import { reqReduxReducer } from 'extensions/checks';
import { fextRequire } from 'extensions/utilities';
const reducers = fextRequire('store/reducers');

const path = 'fext/store/reducers';
export const metadataReducer = reqReduxReducer(reducers, 'metadataReducer', path);
