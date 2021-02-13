import { SET_METADATA } from 'store/actionTypes';
import reducer from './index';

jest.mock('./graphs', () => () => 'graphsData');
jest.mock('./panels', () => () => 'panelsData');
jest.mock('./status', () => () => 'statusData');
jest.mock('extensions/store/reducers', () => ({ metadataReducer: () => 'fextData' }));

describe('reducer', () => {
  test('handles SET_METADATA', () => {
    let action = {
      type: SET_METADATA,
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
      type: SET_METADATA,
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
  test('forwards other actions', () => {
    const action = {
      type: 'action type',
      payload: {
        graphs: 'data1',
        panels: 'data2',
        status: 'data3',
        fext: 'data4',
      },
    };
    const expectedState = {
      graphs: 'graphsData',
      panels: 'panelsData',
      status: 'statusData',
      fext: 'fextData',
    };
    const state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);
  });
});
