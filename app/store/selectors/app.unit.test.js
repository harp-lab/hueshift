import { isDevEnv } from './app';

describe('isDevEnv', () => {
  test('always return false in test environment', () => {
    const store = {};
    expect(isDevEnv(store)).toBe(false);
  });
});
