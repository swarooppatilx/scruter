module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "warn",

  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
