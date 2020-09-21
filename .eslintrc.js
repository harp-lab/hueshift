const path = require('path');

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: 'airbnb',
  rules: {
    // temporarily off
    // 'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',

    'no-use-before-define': ['error', { functions: false }],
    'max-len': ['error', { code: 120 }],
    'react/prop-types': ['error', {
      ignore: [],
      customValidators: [],
      skipUndeclared: true,
    }],
  },
  settings: {
    'import/resolver': {
      node: {},
      // webpack: { config: 'configs/jest/webpack.config.js' },
      alias: [
        ['extensions', path.resolve(__dirname, 'extensions')],
        ['components', path.resolve(__dirname, 'app', 'components')],
        ['library', path.resolve(__dirname, 'app', 'library')],
        ['store', path.resolve(__dirname, 'app', 'store')],
        ['fext-config', path.resolve(__dirname, 'extensions', 'empty')],
        ['fext-layouts', path.resolve(__dirname, 'extensions', 'empty')],
        ['fext-store-hooks', path.resolve(__dirname, 'extensions', 'empty')],
        ['fext-store-reducers', path.resolve(__dirname, 'extensions', 'empty')],
      ],
    },
  },
};
