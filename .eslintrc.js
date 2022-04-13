module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: ["plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint', 'eslint-plugin-import'],
};
