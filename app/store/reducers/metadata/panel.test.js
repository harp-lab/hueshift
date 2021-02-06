import {
  ADD_PANEL, SET_PANEL, SET_PANELS, REFRESH_PANELS,
} from 'store/actionTypes';
import reducer from './panel';

describe('reducer', () => {
  test('handles ADD_PANEL', () => {
    let action = {
      type: ADD_PANEL,
      payload: {
        panelId: 'panel1',
        label: 'panel label1',
      },
    };
    let expectedState = {
      panel1: {
        label: 'panel label1',
        saved: false,
        hidden: true,
        selected: false,
      },
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: ADD_PANEL,
      payload: {
        panelId: 'panel2',
      },
    };
    expectedState = {
      panel1: {
        label: 'panel label1',
        saved: false,
        hidden: true,
        selected: false,
      },
      panel2: {
        label: undefined,
        saved: false,
        hidden: true,
        selected: false,
      },
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles SET_PANEL', () => {
    let action = {
      type: SET_PANEL,
      payload: {
        panelId: 'panel1',
        data: {
          key1: 'value1',
        },
      },
    };
    let expectedState = {
      panel1: {
        key1: 'value1',
      },
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: SET_PANEL,
      payload: {
        panelId: 'panel1',
        data: {
          key2: 'value2',
        },
      },
    };
    expectedState = {
      panel1: {
        key1: 'value1',
        key2: 'value2',
      },
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles SET_PANELS', () => {
    const action = {
      type: SET_PANELS,
      payload: {
        data: {
          key1: 'value1',
          key2: 'value2',
        },
      },
    };
    const expectedState = {
      key1: 'value1',
      key2: 'value2',
    };
    const state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles REFRESH_PANELS', () => {
    const action = {
      type: REFRESH_PANELS,
      payload: {
        func: (panelId, data) => {
          const { key: value } = data;
          return ({
            newKey: `${panelId} ${value} new`,
          });
        },
      },
    };
    const initialState = {
      panel1: {
        key: 'value1',
      },
      panel2: {
        key: 'value2',
      },
    };
    const expectedState = {
      panel1: {
        key: 'value1',
        newKey: 'panel1 value1 new',
      },
      panel2: {
        key: 'value2',
        newKey: 'panel2 value2 new',
      },
    };
    const state = reducer(initialState, action);
    expect(state).toMatchObject(expectedState);
  });
});
