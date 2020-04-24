module.exports = {
  fext: {
    path: 'fext',
    config: 'fext/fext.config.js',
    layouts: 'fext/layouts',
    store: {
      hooks: 'fext/store/hooks',
      reducers: 'fext/store/reducers'
    }
  },
  engine: {
    path: 'fext/engine'
  },
  webpack: {
    config: 'fext/webpack.config.js',
    build: 'build'
  },
  server: {
    hostname: 'localhost',
    port: 8086
  }
};
