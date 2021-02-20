import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_USER } from 'store/actionTypes';
import { login } from './users';

jest.mock('store', () => {});
jest.mock('extensions/store/hooks', () => {});

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
});
