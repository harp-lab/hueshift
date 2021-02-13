import { SET_GRAPH_METADATA } from 'store/actionTypes';
import reducer from './graphs';

describe('reducer', () => {
  test('handles SET_GRAPH_METADATA', () => {
    let action = {
      type: SET_GRAPH_METADATA,
      payload: {
        graphId: 'graph1',
        data: {
          key1: 'value1',
        },
      },
    };
    let expectedState = {
      graph1: {
        key1: 'value1',
      },
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: SET_GRAPH_METADATA,
      payload: {
        graphId: 'graph1',
        data: {
          key2: 'value2',
        },
      },
    };
    expectedState = {
      graph1: {
        key1: 'value1',
        key2: 'value2',
      },
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
});
