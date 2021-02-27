import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_USER } from 'store/actionTypes';
import { login, logout } from './users';

const MOCKED_DEL_PROJECTS = 'delProjects';
const MOCKED_SEL_PROJECT = 'selProject';

jest.mock('./projects', () => ({
  delProjects: () => ({ type: MOCKED_DEL_PROJECTS }),
  selProject: () => ({ type: MOCKED_SEL_PROJECT }),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('sets user on login', () => {
    const expectedActions = [
      {
        type: SET_USER,
        payload: { userId: 'userid' },
      },
    ];
    const store = mockStore();
    store.dispatch(login('userid'));
    expect(store.getActions()).toMatchObject(expectedActions);
  });
  it('removes projects on logout', () => {
    const expectedActions = [
      {
        type: SET_USER,
        payload: { userId: undefined },
      },
      { type: MOCKED_SEL_PROJECT },
      { type: MOCKED_DEL_PROJECTS },
    ];
    const store = mockStore();
    store.dispatch(logout());
    expect(store.getActions()).toMatchObject(expectedActions);
  });
});
