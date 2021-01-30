import reducer from './projects';
import {
  ADD_PROJECT, SET_PROJECT, DEL_PROJECT, DEL_PROJECTS,
} from '../actionTypes';

jest.mock('./project', () => () => ({}));

describe('reducer', () => {
  test('handles ADD_PROJECT', () => {
    let action = {
      type: ADD_PROJECT,
      payload: {
        projectId: 'project1',
      },
    };
    let expectedState = {
      project1: {},
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: ADD_PROJECT,
      payload: {
        projectId: 'project2',
      },
    };
    expectedState = {
      project1: {},
      project2: {},
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles SET_PROJECT', () => {
    let action = {
      type: SET_PROJECT,
      payload: {
        projectId: 'project1',
      },
    };
    let expectedState = {
      project1: {},
    };
    let state = reducer(undefined, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: SET_PROJECT,
      payload: {
        projectId: 'project2',
      },
    };
    expectedState = {
      project1: {},
      project2: {},
    };
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles DEL_PROJECT', () => {
    let action = {
      type: DEL_PROJECT,
      payload: {
        projectId: 'project1',
      },
    };
    const initialState = {
      project1: {},
      project2: {},
    };
    let expectedState = {
      project2: {},
    };
    let state = reducer(initialState, action);
    expect(state).toMatchObject(expectedState);

    action = {
      type: DEL_PROJECT,
      payload: {
        projectId: 'project2',
      },
    };
    expectedState = {};
    state = reducer(state, action);
    expect(state).toMatchObject(expectedState);
  });
  test('handles DEL_PROJECTS', () => {
    const action = {
      type: DEL_PROJECTS,
    };
    const initialState = {
      project1: {},
      project2: {},
    };
    const expectedState = {};
    const state = reducer(initialState, action);
    expect(state).toMatchObject(expectedState);
  });
});
