describe('isDevEnv', () => {
  const ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env = ENV;
  });

  test('returns true when NODE_ENV set to development', () => {
    process.env.NODE_ENV = 'development';

    const { isDevEnv } = require('./app'); // eslint-disable-line global-require
    const store = {};
    expect(isDevEnv(store)).toBe(true);
  });

  test('returns false when NODE_ENV not set to development', () => {
    process.env.NODE_ENV = 'production';

    const { isDevEnv } = require('./app'); // eslint-disable-line global-require
    const store = {};
    expect(isDevEnv(store)).toBe(false);
  });
});
