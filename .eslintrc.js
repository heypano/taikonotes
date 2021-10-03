module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
  ],
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
    "no-debugger": 1,
    "react/prop-types": 1,
    "react/no-unknown-property": 1,
    "react/require-default-props": 1,
    "react/no-array-index-key": 1,
    "jsx-a11y/label-has-associated-control": 1,
    "jsx-a11y/no-static-element-interactions": 1,
    "jsx-a11y/click-events-have-key-events": 1,
    "jsx-a11y/interactive-supports-focus": 1,
    "jsx-a11y/no-noninteractive-element-interactions": 1,
    "@next/next/no-img-element": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "no-plusplus": 0,
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": 0,
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // should add ".ts" if typescript project
  },
};
