const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { PACKAGE_PATH } = require('../consts.js');
const { FEXT_DIR, BUILD_DIR } = require(path.resolve(PACKAGE_PATH, 'framework.config.js'));
const package = require(path.resolve(PACKAGE_PATH, 'package.json'));

const frameworkDir = path.resolve(__dirname, '..');
const appDir = path.resolve(frameworkDir, 'app');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(appDir, 'template.js')
});
const EnvironmentPluginConfig = new EnvironmentPlugin({
  VERSION: package.version
});

module.exports = {
  entry: path.resolve(appDir, 'index.js'),
  resolve: {
    alias: {
      'extensions': path.resolve(frameworkDir, 'extensions'),
      'components': path.resolve(appDir, 'components'),
      'library': path.resolve(appDir, 'library'),
      'store': path.resolve(appDir, 'store'),
      'fext': FEXT_DIR
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!hueshift)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!hueshift)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: BUILD_DIR
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'multiple',
    splitChunks: {
      chunks: 'all',
      maxSize: 244000
    },
  },
  plugins: [
    HTMLWebpackPluginConfig,
    EnvironmentPluginConfig
  ],
  stats: 'minimal'
};
