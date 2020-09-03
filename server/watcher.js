const childProcess = require('child_process');
const fs = require('fs');

const fsp = fs.promises;
const path = require('path');
const chalk = require('chalk');

const Consts = require('./Consts');

const { fext } = Consts;

const WATCHER_LOG_TAG = chalk.blackBright('[wch]');

/**
 * @param {String} content message content
 */
function consoleLog(content) {
  const symbol = chalk.blue('i');
  const tag = `${symbol} ${WATCHER_LOG_TAG}`;
  /* eslint-disable no-console */
  console.log(`${tag} ${content}`);
}

/**
 * @param {String} content message content
 */
function consoleError(content) {
  const symbol = chalk.red('!');
  const tag = `${symbol} ${WATCHER_LOG_TAG}`;
  const error = chalk.redBright('[error]');
  /* eslint-disable no-console */
  console.error(`${tag} ${content} ${error}`);
}

class Watcher {
  constructor() {
    process.on('message', (data) => {
      const { action } = data;
      switch (action) {
        case Consts.WATCHER_ACTION_PROCESS:
          if (!this.state.processing) { this.processLoop(); }
          break;
        case Consts.WATCHER_ACTION_CANCEL:
          this.revert(data.id);
          break;
        default:
          consoleLog(`invalid watcher action (${action})`);
          break;
      }
    });

    this.state = { processing: false, interrupt: false };
    consoleLog('watcher started');
    this.processLoop();
  }

  async processLoop() {
    const file = await Watcher.getNextFile();
    if (file) {
      if (!this.state.interrupt) {
        this.state.processing = true;
        await this.process(file);
        await this.processLoop();
      }
    } else { this.state.processing = false; }
  }

  interrupt() {
    this.state.interrupt = true;
    if (this.engineProcess) {
      this.engineProcess.kill();
      this.engineProcess = undefined;
    }
  }

  resume() {
    this.state.interrupt = false;
    if (this.state.processing) { this.processLoop(); }
  }

  /**
   * read input directory for oldest file
   * @returns {String} file path
   */
  static async getNextFile() {
    const files = await fsp.readdir(Consts.INPUT_DIR);
    let oldestFile; let
      oldestCtime;
    if (files.length > 0) {
      for await (const file of files) {
        const fileStats = await fsp.stat(path.resolve(Consts.INPUT_DIR, file));
        const ctime = fileStats.ctimeMs;
        if (!oldestFile || ctime < oldestCtime) {
          oldestFile = file;
          oldestCtime = ctime;
        }
      }
    }
    return oldestFile;
  }

  async process(file) {
    consoleLog('calling engine');
    const inputPath = path.resolve(Consts.INPUT_DIR, file);
    const outputPath = path.resolve(Consts.OUTPUT_DIR, file);
    const { command, args } = fext.engine(inputPath, outputPath);
    const options = {
      cwd: Consts.ENGINE_DIR,
      stdio: 'inherit',
    };

    // call engine promise
    const code = await new Promise((resolve) => {
      this.engineProcess = childProcess.spawn(command, args, options);
      this.engineProcess.on('exit', (exitCode) => {
        this.fileProcess = undefined;
        resolve(exitCode);
      });
      this.fileProcess = file;
    });
    // callback if engine not killed
    if (this.engineProcess && !this.engineProcess.killed) {
      this.engineProcess = undefined;
      await Watcher.clean(file, code);
      Watcher.notify(file, Consts.WATCHER_ACTION_PROCESS);
    }
  }

  static async clean(file, code) {
    const inputPath = path.resolve(Consts.INPUT_DIR, file);
    switch (code) {
      case 0:
        consoleLog('engine finished');
        break;
      case 2:
        consoleError('parse error');
        await Watcher.mark(file, 'parse');
        break;
      default:
        consoleError('error');
        await Watcher.mark(file);
        break;
    }
    consoleLog('deleting input file');
    await fsp.unlink(inputPath);
  }

  static async mark(file, error) {
    const srcPath = path.resolve(Consts.INPUT_DIR, file);
    const destPath = path.resolve(Consts.OUTPUT_DIR, file);
    const project = await Watcher.read(srcPath);
    project.status = 'error';
    project.error = error;
    await Watcher.write(destPath, project);
  }

  async revert(file) {
    // interrupt engine if file being processed
    if (this.fileProcess === file) { this.interrupt(); }

    // read data and delete input
    const srcPath = path.resolve(Consts.INPUT_DIR, file);
    const destPath = path.resolve(Consts.SAVE_DIR, file);
    const project = await Watcher.read(srcPath);
    await fsp.unlink(srcPath);

    // revert status to 'edit'
    project.status = 'edit';
    await Watcher.write(destPath, project);

    this.resume();
    Watcher.notify(file, Consts.WATCHER_ACTION_CANCEL);
  }

  static notify(file, action) {
    process.send({
      id: file,
      action,
    });
  }

  static async read(filePath) {
    const file = await fsp.open(filePath);
    const data = await file.readFile({ encoding: 'utf-8' });
    await file.close();
    return JSON.parse(data);
  }

  static async write(filePath, data) {
    const file = await fsp.open(filePath, 'w');
    await file.writeFile(JSON.stringify(data));
    await file.close();
  }
}

/* eslint-disable no-unused-vars */
const watcher = new Watcher();
