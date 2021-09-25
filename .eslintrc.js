module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "airbnb/hooks", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: 0,
    "no-unused-vars": [
      1,
      { vars: "all", args: "none", ignoreRestSiblings: false }, // do not check function arguments so we can be aware of what is available
    ],
    "no-console": [1, { allow: ["debug", "error"] }],
    "react/prop-types": 1,
    "react/no-unknown-property": 1,
    "react/require-default-props": 1,
    "react/no-array-index-key": 1,
    "no-debugger": 1,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "no-plusplus": 0,
  },
};
