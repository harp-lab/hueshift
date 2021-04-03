import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  ADD_PROJECT, DEL_PROJECT, DEL_PROJECTS, SEL_PROJECT,
  SET_PROJECT_DATA, SET_STATUS, SET_METADATA,
} from 'store/actionTypes';
import { COMPLETE_STATUS, CLIENT_LOCAL_STATUS } from 'store/consts';
import {
  addProject, deleteProjectLocal, delProjects, selProject,
  setClientStatus, setStatus,
  generateMetadata, setMetadata,
  setProjectData, importData,
  importFile,
} from './projects';

const MOCKED_GENERATE_METADATA_HOOK = 'generateMetadataHook';
const MOCKED_SET_TITLE = 'setTitle';
const MOCKED_QUEUE_SNACKBAR = 'queueSnackbar';

jest.mock('extensions/store/hooks', () => ({
  generateMetadataHook: () => ({ type: MOCKED_GENERATE_METADATA_HOOK }),
}));
jest.mock('store', () => ({
  getState: () => ({}),
}));
jest.mock('store/selectors', () => ({
  getProject: () => ({}),
}));
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
  it('sets project id as app title when selected', () => {
    const expectedActions = [
      {
        type: SEL_PROJECT,
        payload: { projectId: 'projectid' },
      },
      { type: MOCKED_SET_TITLE },
    ];
    const store = mockStore();
    store.dispatch(selProject('projectid'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('imports project data', () => {
    const projectId = 'projectid';
    const data = 'data';
    const expectedActions = [
      {
        type: ADD_PROJECT,
        payload: { projectId },
      },
      {
        type: SET_PROJECT_DATA,
        payload: { projectId, data },
      },
      {
        type: SET_STATUS,
        payload: {
          projectId,
          data: COMPLETE_STATUS,
        },
      },
      {
        type: SET_STATUS,
        payload: {
          projectId,
          data: {
            client: CLIENT_LOCAL_STATUS,
          },
        },
      },
      { type: MOCKED_GENERATE_METADATA_HOOK },
    ];
    const store = mockStore();
    store.dispatch(importData('projectid', 'data'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('calls FEXT hook to generate metadata', () => {
    const expectedActions = [
      { type: MOCKED_GENERATE_METADATA_HOOK },
    ];
    const store = mockStore();
    store.dispatch(generateMetadata('projectid'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('sets project metadata', () => {
    const expectedActions = [
      {
        type: SET_METADATA,
        payload: {
          projectId: 'projectid',
          data: 'data',
        },
      },
    ];
    const store = mockStore();
    store.dispatch(setMetadata('projectid', 'data'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  describe('handles project data files', () => {
    it('reads file', async (done) => {
      // create mock file
      const projectId = 'projectid';
      const data = { key: 'value' };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const file = new File(
        [blob],
        `${projectId}.json`,
      );

      const expectedActions = [
        {
          type: ADD_PROJECT,
          payload: { projectId },
        },
        {
          type: SET_PROJECT_DATA,
          payload: { projectId, data },
        },
        {
          type: SET_STATUS,
          payload: {
            projectId,
            data: COMPLETE_STATUS,
          },
        },
        {
          type: SET_STATUS,
          payload: {
            projectId,
            data: {
              client: CLIENT_LOCAL_STATUS,
            },
          },
        },
        { type: MOCKED_GENERATE_METADATA_HOOK },
      ];
      const store = mockStore();

      // create mock file reader for test on callback
      const mockedFileReader = new FileReader();
      mockedFileReader.onloadend = () => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      };
      jest.spyOn(global, 'FileReader')
        .mockImplementation(() => mockedFileReader);

      store.dispatch(importFile(file));
    });
  });
});
