import { reqFunction, reqFunctionFactory, reqReduxAction } from 'extensions/checks';
let hooks;
try {
  hooks = require('fext/store/hooks');
} catch(err) {
  hooks = {};
}

const path = 'fext/store/hooks';

export const dataProcessHook = reqFunction(hooks, 'dataProcessHook', path);

export const generateMetadataHook = reqReduxAction(hooks, 'generateMetadataHook', path);
export const nodeSelectHook = reqReduxAction(hooks, 'nodeSelectHook', path);
export const nodeUnselectHook = reqReduxAction(hooks, 'nodeUnselectHook', path);

export const cyNodeDataHook = reqFunctionFactory(hooks, 'cyNodeDataHook', path);
