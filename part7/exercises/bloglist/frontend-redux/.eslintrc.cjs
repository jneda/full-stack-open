module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "jest", "cypress"],
  rules: {
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    eqeqeq: "error",
    "no-console": 0,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
