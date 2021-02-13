import { DEV_ENV, PROD_ENV } from 'store/consts';
import {
  getSelectedProjectId, getTitle, getUser, isLoggedIn,
} from 'store/selectors';

describe('getSelectedProjectId', () => {
  test('returns selectedProjectId', () => {
    const selectedProjectId = getSelectedProjectId({
      selectedProjectId: 'selectedProjectId',
    });
    expect(selectedProjectId).toBe('selectedProjectId');
  });
});

describe('getTitle', () => {
  test('returns title', () => {
    const title = getTitle({
      title: 'application title',
    });
    expect(title).toBe('application title');
  });
});

describe('getUser', () => {
  test('returns userId', () => {
    const userId = getUser({
      userId: 'userId',
    });
    expect(userId).toBe('userId');
  });
});

describe('isDevEnv', () => {
  const ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env = ENV;
  });

  test('returns true when NODE_ENV set to development', () => {
    process.env.NODE_ENV = DEV_ENV;

    const { isDevEnv } = require('./app'); // eslint-disable-line global-require
    expect(isDevEnv({})).toBe(true);
  });

  test('returns false when NODE_ENV not set to development', () => {
    process.env.NODE_ENV = PROD_ENV;

    const { isDevEnv } = require('./app'); // eslint-disable-line global-require
    expect(isDevEnv({})).toBe(false);
  });
});

describe('isLoggedIn', () => {
  test('returns true when userId defined', () => {
    const loggedIn = isLoggedIn({
      userId: 'userId',
    });
    expect(loggedIn).toBe(true);
  });
  test('returns false when userId undefined', () => {
    const loggedIn = isLoggedIn({
      userId: undefined,
    });
    expect(loggedIn).toBe(false);
  });
});
