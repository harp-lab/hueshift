const childProcess = require('child_process');
const path = require('path');

const frameworkPath = process.cwd();

test('dev environment without hueshift.config.js', async (done) => {
  const binPath = path.resolve(frameworkPath, 'bin', 'cli.js');
  const bin = childProcess.spawn(binPath, ['dev'], { cwd: __dirname });

  let stdout = '';
  bin.stdout.on('data', processOutput);
  bin.stderr.on('data', processOutput);

  function processOutput(data) {
    stdout += data;
    if (data.toString().includes('Compiled')) {
      check();
    }
  }

  function check() {
    bin.kill();

    const stdoutString = stdout.toString();
    expect(stdoutString).toContain('server listening');
    expect(stdoutString).toContain('Compiled');

    done();
  }
}, 60000);
