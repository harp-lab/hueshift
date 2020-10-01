import { reqReduxReducer } from 'extensions/checks';
import * as reducers from 'fext-store-reducers';

const path = 'fext/store/reducers';

/* eslint-disable-next-line import/prefer-default-export */
export const metadataReducer = reqReduxReducer(reducers, 'metadataReducer', path);
