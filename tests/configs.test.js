const child_process = require('child_process');
const path = require('path');

const frameworkPath = path.resolve(__dirname, '..');

test('dev environment without hueshift.config.js', async (done) => {
  const binPath = path.resolve(frameworkPath, 'bin', 'cli.js');
  const bin = child_process.spawn(binPath, ['dev'], { cwd: __dirname });

  let stdout = '';
  bin.stdout.on('data', data => {
    stdout += data;
    if (data.toString().includes('Compiled successfully.')) {
      check();
    }
  });
  bin.stderr.on('data', data => check());

  function check() {
    bin.kill();

    const stdoutString = stdout.toString();
    expect(stdoutString).toContain('server listening at localhost:8086');
    expect(stdoutString).toContain('Compiled successfully.');

    done();
  }
}, 60000);

test('consts without hueshift.config.js', () => {
  process.chdir(__dirname);
  process.env.HS_CONFIG = 'hueshift.config.js';
  const { getObjectValue, reqAbsolutePath } = require(path.resolve(frameworkPath, 'utilities'));

  const consts = require(path.resolve(frameworkPath, 'bin', 'consts.js'));
  const defaults = require(path.resolve(frameworkPath, 'configs', 'default.config.js'));
  const emptyExtensionPath = path.resolve(frameworkPath, 'extensions', 'empty');

  const expected = {
    PACKAGE_PATH: __dirname,
    version: -1,
    fext: {
      path: reqAbsolutePath(getObjectValue(defaults, 'fext.path')),
      configPath: emptyExtensionPath,
      config: {},
      layouts: emptyExtensionPath,
      store: {
        hooks: emptyExtensionPath,
        reducers: emptyExtensionPath
      },
      webpack: {
        config: {},
        build: reqAbsolutePath(getObjectValue(defaults, 'webpack.build')),
        headTemplate: '',
        bodyTemplate: ''
      },
      engine: {
        disabled: true,
        path: reqAbsolutePath(getObjectValue(defaults, 'engine.path'))
      },
      server: {
        hostname: getObjectValue(defaults, 'server.hostname'),
        port: getObjectValue(defaults, 'server.port')
      }
    }
  }
  expect(consts).toMatchObject(expected);
});