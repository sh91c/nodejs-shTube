module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'off',
    'no-console': 'off',
    'spaced-comment': 'off',
    'no-else-return': 'off',
    'space-after-keywords': 'off',
    'key-spacing': 'off',
    'object-curly-spacing': 'off',
    'comma-spacing': 'off',
    'eol-last': 'off',
    'comma-dangle': 'off',
    'space-before-blocks': 'off',
    'space-in-parens': 'off',
    'indent': 'off',
    'max-len': 'off',
  },
  env: {
    browser: true
  }
};
