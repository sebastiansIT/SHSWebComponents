module.exports = {
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'jsdoc'
  ],
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jsdoc/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    // "jsdoc/check-examples": 0, // Actualy not supported in ESLint 8
    'jsdoc/check-indentation': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/check-tag-names': ['error', { definedTags: ['customElement'] }], // Recommended
    'jsdoc/match-description': 1,
    'jsdoc/require-description': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/newline-after-description': 0,
    'jsdoc/multiline-blocks': ['error' | 'warn', { noZeroLineText: false }]
  },
  settings: {
    jsdoc: {
      mode: 'jsdoc'
    }
  }
}
