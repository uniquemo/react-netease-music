/**
 * eslint: eslint的核心代码。
 * @typescript-eslint/parser: eslint的解析器，用于解析typescript，从而检查和规范Typescript代码。
 * @typescript-eslint/eslint-plugin: 这是一个eslint插件，包含了各类定义好的检测Typescript代码的规范。
 */
module.exports = {
  parser: '@typescript-eslint/parser',      // 定义eslint的解析器，在ts项目中必须指定解析器为@typescript-eslint/parser，才能正确的检测和规范TS代码。
  extends: [
    'plugin:react/recommended',               // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // Enables eslint-plugin-prettier and eslint-config-prettier.
    // This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,    // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  env: {            // 指定代码的运行环境
    browser: true,  // env环境变量配置，形如console属性只有在browser环境下才会存在，如果没有设置支持browser，那么可能报console is undefined的错误。
    node: true,
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    quotes: ['error', 'single'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    // 'react/jsx-uses-react': 'off',
    // 'react/react-in-jsx-scope': 'off'
  },
}
