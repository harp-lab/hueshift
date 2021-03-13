import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  ADD_PROJECT, DEL_PROJECT, DEL_PROJECTS,
  SET_PROJECT_DATA, SET_STATUS,
} from 'store/actionTypes';
import {
  addProject, deleteProjectLocal, delProjects,
  setClientStatus, setProjectData, setStatus,
} from './projects';

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
  it('sets project status', () => {
    const expectedActions = [
      {
        type: SET_STATUS,
        payload: {
          projectId: 'projectid',
          data: 'data',
        },
      },
    ];
    const store = mockStore();
    store.dispatch(setStatus('projectid', 'data'));
    expect(store.getActions()).toEqual(expectedActions);
  });
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
  it('adds project', () => {
    const expectedActions = [
      {
        type: ADD_PROJECT,
        payload: { projectId: 'projectid' },
      },
    ];
    const store = mockStore();
    store.dispatch(addProject('projectid'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('sets project data', () => {
    const expectedActions = [
      {
        type: SET_PROJECT_DATA,
        payload: {
          projectId: 'projectid',
          data: 'data',
        },
      },
    ];
    const store = mockStore();
    store.dispatch(setProjectData('projectid', 'data'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('deletes local project', () => {
    const expectedActions = [
      {
        type: DEL_PROJECT,
        payload: { projectId: 'projectid' },
      },
    ];
    const store = mockStore();
    store.dispatch(deleteProjectLocal('projectid'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('deletes all projects', () => {
    const expectedActions = [
      { type: DEL_PROJECTS },
    ];
    const store = mockStore();
    store.dispatch(delProjects());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
