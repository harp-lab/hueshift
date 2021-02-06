import {
  QUEUE_SNACKBAR, DEQUEUE_SNACKBAR, SET_LOADING, SET_DIALOG,
} from 'store/actionTypes';
import reducer from './notifications';

describe('reducer', () => {
  test('handles QUEUE_SNACKBAR', () => {
    let action = {
      type: QUEUE_SNACKBAR,
      payload: {
        text: 'message 1',
      },
    };
    let expectedState = {
      snackbars: ['message 1'],
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: QUEUE_SNACKBAR,
      payload: {
        text: 'message 2',
      },
    };
    expectedState = {
      snackbars: [
        'message 1',
        'message 2',
      ],
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles DEQUEUE_SNACKBAR', () => {
    const action = { type: DEQUEUE_SNACKBAR };
    const initialState = {
      snackbars: [
        'message 1',
        'message 2',
      ],
    };
    let expectedState = {
      snackbars: ['message 2'],
    };
    let state = reducer(initialState, action);
    expect(state).toMatchObject(expectedState);

    expectedState = {
      snackbars: [],
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles SET_LOADING', () => {
    const action = {
      type: SET_LOADING,
      payload: {
        loading: true,
      },
    };
    const expectedState = {
      loading: true,
    };
    const state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles SET_DIALOG', () => {
    let action = {
      type: SET_DIALOG,
      payload: {
        dialogId: 'dialog 1',
        data: 'dialog 1 data',
      },
    };
    let expectedState = {
      dialogs: {
        'dialog 1': 'dialog 1 data',
      },
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: SET_DIALOG,
      payload: {
        dialogId: 'dialog 2',
        data: 'dialog 2 data',
      },
    };
    expectedState = {
      dialogs: {
        'dialog 1': 'dialog 1 data',
        'dialog 2': 'dialog 2 data',
      },
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
});
