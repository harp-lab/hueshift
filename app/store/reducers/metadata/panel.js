import {
  ADD_PANEL, SET_PANEL, SET_PANELS, REFRESH_PANELS,
} from 'store/actionTypes';

/**
 * project panel metadata state reducer
 * @param {Object} state
 * @param {Object} action
 * @param {String} action.type action type
 * @param {Object} action.payload action payload
 * @returns {Object} state
 */
function panelReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PANEL: {
      const { panelId, label } = action.payload;
      return {
        ...state,
        [panelId]: {
          label,
          saved: false,
          hidden: true,
          selected: false,
        },
      };
    }
    case SET_PANEL: {
      const { panelId, data } = action.payload;
      const panel = state[panelId];
      return {
        ...state,
        [panelId]: {
          ...panel,
          ...data,
        },
      };
    }
    case SET_PANELS: {
      const { data } = action.payload;
      return { ...data };
    }
    case REFRESH_PANELS: {
      const { func } = action.payload;
      const panels = {};
      Object.entries(state).forEach(([panelId, data]) => {
        const newData = func(panelId, data);
        panels[panelId] = { ...data, ...newData };
      });
      return panels;
    }
    default: return state;
  }
}

export default panelReducer;
