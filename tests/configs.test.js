const child_process = require('child_process');
const path = require('path');

const binPath = path.resolve('bin', 'cli.js');

test('compile without hueshift.config.js', async (done) => {
  const bin = child_process.spawn(
    binPath, ['dev'], {
      env: { PWD: __dirname }
    });

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