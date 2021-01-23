import reducer from './project';
import { SET_PROJECT_DATA } from '../actionTypes';

jest.mock('./metadata', () => () => ({}));

describe('reducer', () => {
  test('handles SET_PROJECT_DATA', () => {
    let action = {
      type: SET_PROJECT_DATA,
      payload: {
        data: {
          key1: 'value1',
        },
      },
    };
    let expectedState = {
      key1: 'value1',
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: SET_PROJECT_DATA,
      payload: {
        data: {
          key2: 'value2',
        },
      },
    };
    expectedState = {
      key1: 'value1',
      key2: 'value2',
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
});
