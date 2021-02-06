import panelReducer from './panel';

/**
 * project panels metadata state reducer
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload action payload
 * @param {String} action.payload.type panel type
 * @returns {Object} state
 */
function panelsReducer(state = {}, action) {
  if (action.payload && action.payload.type) {
    const reducerType = action.payload.type;
    state[reducerType] = panelReducer(state[reducerType], action); // eslint-disable-line no-param-reassign
    return state;
  }
  return state;
}

export default panelsReducer;
