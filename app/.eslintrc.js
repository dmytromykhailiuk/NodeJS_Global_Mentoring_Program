module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'consistent-return': 'off',
    'no-empty-function': 'off',
    'prettier/prettier': [
      1,
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: true,
      },
    ],
    'no-console': 0,
  },
};
