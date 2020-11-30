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
  (userId) => {
    return userId !== undefined;
  },
);

export const getSelectedProjectId = (state) => state.selectedProjectId;

export const getView = createSelector(
  isLoggedIn,
  getSelectedProjectId,
  (isLoggedIn, projectId) => {
    if (!isLoggedIn) { return LOGIN_VIEW; }
    if (!projectId) { return LIST_VIEW; }
    return PROJECT_VIEW;
  },
);

export const getTitle = (state) => state.title;

export const getLabel = (item) => item.label;

/**
 * @returns {Boolean} dev env status
 */
export const isDevEnv = createSelector(
  (state) => state,
  () => NODE_ENV === DEV_ENV,
);
