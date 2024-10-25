module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:ejs/recommended', // Enables EJS linting
    'prettier', // Make sure to put this last
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Add your custom rules here
  },
};
