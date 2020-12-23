import { createSelector } from 'reselect';
import {
  NODE_ENV, DEV_ENV, LOGIN_VIEW, LIST_VIEW, PROJECT_VIEW,
} from 'store/consts';

export const getUser = (state) => state.userId;

/**
 * Check if user is logged in.
 * @returns {Boolean} login status
 */
export const isLoggedIn = createSelector(
  getUser,
  (userId) => userId !== undefined,
);

export const getSelectedProjectId = (state) => state.selectedProjectId;

export const getView = createSelector(
  isLoggedIn,
  getSelectedProjectId,
  (loggedIn, projectId) => {
    if (!loggedIn) { return LOGIN_VIEW; }
    if (!projectId) { return LIST_VIEW; }
    return PROJECT_VIEW;
  },
);

/**
 * Get app title.
 * @param {Object} state state
 * @returns {String} app title
 */
export const getTitle = (state) => state.title;

export const getLabel = (item) => item.label;

/**
 * Check if dev environment.
 * @returns {Boolean} dev env status
 */
export const isDevEnv = createSelector(
  (state) => state,
  () => NODE_ENV === DEV_ENV,
);
