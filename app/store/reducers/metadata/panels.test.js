import reducer from './panels';

jest.mock('./panel', () => () => ({}));

describe('reducer', () => {
  test('handles any action', () => {
    let action = {
      type: 'action type',
      payload: {
        type: 'type1',
      },
    };
    let expectedState = {
      type1: {},
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: 'action type',
      payload: {
        type: 'type2',
      },
    };
    expectedState = {
      type1: {},
      type2: {},
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
});
