const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');

const { HS_CONSTS } = process.env;
const {
  APP_PATH, EXTENSIONS_PATH, COMPONENTS_PATH, LIBRARY_PATH, STORE_PATH,
  version,
  fext,
} = require(HS_CONSTS); /* eslint-disable-line import/no-dynamic-require */

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(APP_PATH, 'template.js'),
  templateParameters: {
    headTemplate: fext.webpack.headTemplate,
    bodyTemplate: fext.webpack.bodyTemplate,
  },
});
const EnvironmentPluginConfig = new EnvironmentPlugin({
  VERSION: version,
});

module.exports = {
  entry: APP_PATH,
  resolve: {
    alias: {
      extensions: EXTENSIONS_PATH,
      components: COMPONENTS_PATH,
      library: LIBRARY_PATH,
      store: STORE_PATH,
      fext: fext.path,
      'fext-config': fext.configPath,
      'fext-layouts': fext.layouts,
      'fext-store-hooks': fext.store.hooks,
      'fext-store-reducers': fext.store.reducers,
    },
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!hueshift)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!hueshift)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: fext.webpack.build,
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'multiple',
    splitChunks: {
      chunks: 'all',
      maxSize: 244000,
    },
  },
  plugins: [
    HTMLWebpackPluginConfig,
    EnvironmentPluginConfig,
  ],
  stats: 'minimal',
};
