import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_STATUS } from 'store/actionTypes';
import { setClientStatus } from './projects';

const MOCKED_GENERATE_METADATA_HOOK = 'generateMetadataHook';
const MOCKED_SET_TITLE = 'setTitle';
const MOCKED_QUEUE_SNACKBAR = 'queueSnackbar';

jest.mock('extensions/store/hooks', () => ({
  generateMetadataHook: () => ({ type: MOCKED_GENERATE_METADATA_HOOK }),
}));
jest.mock('store', () => {});
jest.mock('./app', () => ({
  setTitle: () => ({ type: MOCKED_SET_TITLE }),
}));
jest.mock('./notifications', () => ({
  queueSnackbar: () => ({ type: MOCKED_QUEUE_SNACKBAR }),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('sets project client status', () => {
    const expectedActions = [
      {
        type: SET_STATUS,
        payload: {
          projectId: 'projectid',
          data: {
            client: 'status',
          },
        },
      },
    ];
    const store = mockStore();
    store.dispatch(setClientStatus('projectid', 'status'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
