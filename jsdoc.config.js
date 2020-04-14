const { LIBRARY_PATH, STORE_PATH } = require('./consts.js');

module.exports = {
  plugins: [
    'plugins/markdown'
  ],
  recurseDepth: 100,
  source: {
    include: [
      LIBRARY_PATH,
      STORE_PATH,
      'fext',
      'package.json',
      'README.md'
    ]
  },
  opts: {
    destination: 'docs',
    recurse: true
  }
};
