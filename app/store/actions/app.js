import { SET_TITLE } from 'store/actionTypes';

/* eslint-disable-next-line import/prefer-default-export */
export const setTitle = (title) => ({
  type: SET_TITLE,
  payload: { title },
});
