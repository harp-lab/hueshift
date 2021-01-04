import { createSelector } from 'reselect';
import {
  NODE_ENV, DEV_ENV, LOGIN_VIEW, LIST_VIEW, PROJECT_VIEW,
} from 'store/consts';

/**
 * Get current user id.
 * @param {Object} state state
 * @returns {String} user id
 */
export const getUser = (state) => state.userId;

/**
 * Check if user is logged in.
 * @returns {Boolean} login status
 */
export const isLoggedIn = createSelector(
  getUser,
  (userId) => userId !== undefined,
);

/**
 * Get selected project id.
 * @param {Object} state state
 * @returns {String} selected project id
 */
export const getSelectedProjectId = (state) => state.selectedProjectId;

/**
 * Get application view.
 * @param {Object} state state
 * @returns {String} application view
 */
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

/**
 * Get state item lebel.
 * @param {Object} item state item
 * @returns {String} label
 */
export const getLabel = (item) => item.label;

/**
 * Check if dev environment.
 * @returns {Boolean} dev env status
 */
export const isDevEnv = createSelector(
  (state) => state,
  () => NODE_ENV === DEV_ENV,
);
