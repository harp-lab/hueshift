import { createSelector } from 'reselect';
import { getProjectMetadata } from './projects';

/**
 * @param {Object} state
 * @param {String} panelType panel type
 * @returns {Object} <{String} panelId, {Object} panelData> hashmap
 */
// eslint-disable-next-line import/prefer-default-export
export const getPanels = createSelector(
  (state, panelType) => [getProjectMetadata(state), panelType],
  ([metadata, panelType]) => metadata.panels[panelType] || {},
);
