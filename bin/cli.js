#!/usr/bin/env node
const child_process = require('child_process');
const path = require('path');
const yargs = require('yargs');

const FRAMEWORK_PATH = path.resolve(__dirname, '..');

yargs
  .command('start', 'start application', () => {}, function(argv) {
    const serverPath = path.resolve(FRAMEWORK_PATH, 'server');
    child_process.spawn(
      'node', [serverPath],
      {
        env: {
          ...process.env,
          hs_config: argv.config
        },
        stdio: 'inherit'
      });
  })
  .command('build', 'build application', () => {}, function(argv) {
    const webpackConfigPath = path.resolve(FRAMEWORK_PATH, 'webpack.config.js');
    child_process.spawn(
      'npx', ['webpack', '--config', webpackConfigPath],
      {
        env: {
          ...process.env,
          hs_config: argv.config,
          fenv: 'production'
        },
        stdio: 'inherit'
      });
  })
  .command('dev', 'start development environment', () => {}, function(argv) {
    // start dev server
    const nodemonPath = path.resolve(__dirname, 'nodemon.js');
    child_process.spawn(
      'node', [nodemonPath],
      {
        env: {
          ...process.env,
          hs_config: argv.config
        },
        stdio: 'inherit'
      });

    // start dev client
    const webpackConfigPath = path.resolve(FRAMEWORK_PATH, 'webpack.config.js');
    child_process.spawn(
      'npx', ['webpack-dev-server', '--config', webpackConfigPath],
      {
        env: {
          ...process.env,
          hs_config: argv.config,
          fenv: 'development'
        },
        stdio: 'inherit'
      });
  })
  .command('docs', 'generate documentation', () => {}, function(argv) {
    const jsdocConfigPath = path.resolve(FRAMEWORK_PATH, 'jsdoc.config.js');
    child_process.spawn(
      'npx', ['jsdoc', '-c', jsdocConfigPath],
      {
        env: {
          ...process.env,
          hs_config: argv.config,
        },
        stdio: 'inherit'
      });
  })
  .option('config', {
    alias: 'c',
    default: 'hueshift.config.js',
    describe: 'config file',
    type: 'string'
  })
  .argv;
