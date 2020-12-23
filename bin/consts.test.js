const path = require('path');

const frameworkPath = process.cwd();

beforeEach(() => {
  process.chdir(__dirname); // change cwd to test path resolution
  jest.resetModules();
});

test('defaults without provided hueshift.config.js', () => {
  /* eslint-disable global-require, import/no-dynamic-require */
  const { getObjectValue, reqAbsolutePath } = require(path.resolve(frameworkPath, 'utilities'));
  const consts = require(path.resolve(frameworkPath, 'bin', 'consts.js'));
  const defaults = require(path.resolve(frameworkPath, 'configs', 'default.config.js'));
  /* eslint-enable global-require, import/no-dynamic-require */
  const emptyExtensionPath = path.resolve(frameworkPath, 'extensions', 'empty');

  const expected = {
    PACKAGE_PATH: __dirname,
    FRAMEWORK_PATH: frameworkPath,
    APP_PATH: path.resolve(frameworkPath, 'app'),
    EXTENSIONS_PATH: path.resolve(frameworkPath, 'extensions'),
    LIBRARY_PATH: path.resolve(frameworkPath, 'app', 'library'),
    STORE_PATH: path.resolve(frameworkPath, 'app', 'store'),
    COMPONENTS_PATH: path.resolve(frameworkPath, 'app', 'components'),
    version: -1,
    fext: {
      path: reqAbsolutePath(getObjectValue(defaults, 'fext.path')),
      configPath: emptyExtensionPath,
      config: {},
      layouts: emptyExtensionPath,
      store: {
        hooks: emptyExtensionPath,
        reducers: emptyExtensionPath,
      },
      webpack: {
        config: {},
        build: reqAbsolutePath(getObjectValue(defaults, 'webpack.build')),
        headTemplate: '',
        bodyTemplate: '',
      },
      engine: {
        disabled: true,
        path: reqAbsolutePath(getObjectValue(defaults, 'engine.path')),
      },
      server: {
        hostname: getObjectValue(defaults, 'server.hostname'),
        port: getObjectValue(defaults, 'server.port'),
      },
    },
  };
  expect(consts).toMatchObject(expected);
});

test('required module paths resolve with provided hueshift.config.js', () => {
  // provide mocked test config
  process.env.HS_CONFIG = './hs_config';
  jest.mock('./hs_config', () => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const scopePath = require('path');
    return {
      fext: {
        path: '/test/fext',
        config: scopePath.resolve('/test', 'fext.config.js'),
        layouts: scopePath.resolve('/test', 'layouts'),
        store: {
          hooks: scopePath.resolve('/test', 'store', 'hooks'),
          reducers: scopePath.resolve('/test', 'store', 'reducers'),
        },
      },
    };
  }, { virtual: true });

  // mock all modules
  jest.mock('/test/fext.config.js', () => ({}), { virtual: true });
  jest.mock('/test/layouts', () => ({}), { virtual: true });
  jest.mock('/test/store/hooks', () => ({}), { virtual: true });
  jest.mock('/test/store/reducers', () => ({}), { virtual: true });

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const consts = require(path.resolve(frameworkPath, 'bin', 'consts.js'));
  expect(consts).toMatchObject({
    fext: {
      path: '/test/fext',
      configPath: path.resolve('/test', 'fext.config.js'),
      layouts: path.resolve('/test', 'layouts'),
      store: {
        hooks: path.resolve('/test', 'store', 'hooks'),
        reducers: path.resolve('/test', 'store', 'reducers'),
      },
    },
  });
});

test('engine enabled with provided hueshift.config.js', () => {
  // provide mocked test configs
  process.env.HS_CONFIG = './hs_config';
  jest.mock('./hs_config', () => {
    const scopePath = require('path'); // eslint-disable-line global-require
    return {
      fext: {
        config: scopePath.resolve('/test', 'fext.config.js'),
      },
      engine: {
        path: scopePath.resolve('/test', 'engine'),
      },
    };
  }, { virtual: true });
  jest.mock('/test/fext.config.js', () => ({
    engine: () => {},
  }), { virtual: true });

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const consts = require(path.resolve(frameworkPath, 'bin', 'consts.js'));
  expect(consts).toMatchObject({
    fext: {
      engine: {
        disabled: false,
        path: path.resolve('/test', 'engine'),
      },
    },
  });
});
