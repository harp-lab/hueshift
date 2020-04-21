const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { HS_CONSTS } = process.env;
const {
  APP_PATH, EXTENSIONS_PATH, COMPONENTS_PATH, LIBRARY_PATH, STORE_PATH,
  PACKAGE_PATH,
  BUILD_PATH, FEXT_PATH, FEXT_CONFIG_PATH, FEXT_LAYOUTS_PATH, FEXT_STORE_HOOKS_PATH, FEXT_STORE_REDUCERS_PATH
} = require(HS_CONSTS);
const { version } = require(path.resolve(PACKAGE_PATH, 'package.json'));

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(APP_PATH, 'template.js')
});
const EnvironmentPluginConfig = new EnvironmentPlugin({
  VERSION: version
});

module.exports = {
  entry: APP_PATH,
  resolve: {
    alias: {
      'extensions': EXTENSIONS_PATH,
      'components': COMPONENTS_PATH,
      'library': LIBRARY_PATH,
      'store': STORE_PATH,
      'fext-config': FEXT_CONFIG_PATH,
      'fext-layouts': FEXT_LAYOUTS_PATH,
      'fext-store-hooks': FEXT_STORE_HOOKS_PATH,
      'fext-store-reducers': FEXT_STORE_REDUCERS_PATH
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
    path: BUILD_PATH
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
