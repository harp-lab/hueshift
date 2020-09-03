const { HS_CONSTS } = process.env;
const { LIBRARY_PATH, STORE_PATH } = require(HS_CONSTS);

module.exports = {
  plugins: [
    'plugins/markdown',
  ],
  recurseDepth: 100,
  source: {
    include: [
      LIBRARY_PATH,
      STORE_PATH,
      'fext',
      'package.json',
      'README.md',
    ],
  },
  opts: {
    destination: 'docs',
    recurse: true,
  },
};
