import { createSelector } from 'reselect';

/**
 * Get notifications state.
 * @param {Object} state state
 * @returns {Object} notifications state
 */
export const getNotificationsState = (state) => state.notifications;

/**
 * Get current snackbar notification.
 * @param {Object} state state
 * @returns {String} snackbar notification message
 */
export const getSnackbar = createSelector(
  getNotificationsState,
  (notifications) => notifications.snackbars[0],
);

/**
 * Get dialog factory.
 * @param {String} dialogId dialog type id
 * @returns {Function} memoized state selector
 */
const getDialogFactory = (dialogId) => createSelector(
  getNotificationsState,
  (notifications) => notifications.dialogs[dialogId],
);

/**
 * Get rename dialog.
 * @param {Object} state
 * @returns {String} project id
 */
export const getRenameDialog = getDialogFactory('rename');

/**
 * Get delete dialog.
 * @param {Object} state
 * @returns {String} project id
 */
export const getDeleteDialog = getDialogFactory('delete');
