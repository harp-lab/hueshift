import reducer from './index';
import { SET_USER, SET_TITLE, SEL_PROJECT } from '../actionTypes';

jest.mock('./notifications', () => ({}));
jest.mock('./projects', () => ({}));

describe('reducer', () => {
  test('handles SET_USER', () => {
    const action = {
      type: SET_USER,
      payload: {
        userId: 'user id',
      },
    };
    const newState = { userId: 'user id' };

    expect(reducer(undefined, action)).toMatchObject(newState);
  });

  test('handles SET_TITLE', () => {
    const action = {
      type: SET_TITLE,
      payload: {
        title: 'application title',
      },
    };
    const newState = { title: 'application title' };

    expect(reducer(undefined, action)).toMatchObject(newState);
  });

  test('handles SEL_PROJECT', () => {
    const action = {
      type: SEL_PROJECT,
      payload: {
        projectId: 'project id',
      },
    };
    const newState = { selectedProjectId: 'project id' };

    expect(reducer(undefined, action)).toMatchObject(newState);
  });
});
