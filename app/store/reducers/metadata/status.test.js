import { SET_STATUS } from 'store/actionTypes';
import { CLIENT_WAITING_STATUS } from 'store/consts';
import reducer from './status';

describe('reducer', () => {
  test('handles SET_STATUS', () => {
    let action = {
      type: SET_STATUS,
      payload: {
        data: {
          key1: 'value1',
        },
      },
    };
    let expectedState = {
      client: CLIENT_WAITING_STATUS,
      key1: 'value1',
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: SET_STATUS,
      payload: {
        data: {
          client: 'value2',
        },
      },
    };
    expectedState = {
      client: 'value2',
      key1: 'value1',
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
});
