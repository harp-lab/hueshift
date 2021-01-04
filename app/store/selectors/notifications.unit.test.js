import { getNotificationsState } from 'store/selectors';

describe('getNotificationsState', () => {
  test('returns notifications', () => {
    const notifications = getNotificationsState({
      notifications: { testState: 'testState' },
    });
    expect(notifications).toStrictEqual({ testState: 'testState' });
  });
});
