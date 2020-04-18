const FEXT_CONTEXT = require.context(process.env.FEXT_PATH, true, /[\.js|\/]$/);

/**
 * dynamic optional module require from fext directory
 * @param {String} module fext module path
 */
export function fextRequire(module) {
  let optModule;
  try {
    optModule = FEXT_CONTEXT(`./${module}`);
  } catch(err) {
    optModule = {};
  }
  return optModule;
}
