module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    indentation: 2,
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'function-name-case': null,
    'at-rule-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,
    'block-closing-brace-newline-after': null,
    'max-line-length': [
      140,
      {
        ignore: ['comments'],
      },
    ],
    'no-eol-whitespace': true,
    'value-keyword-case': [
      // 变量名可以使用驼峰格式
      'lower',
      {
        ignoreFunctions: ['t', 'var'],
        ignoreProperties: ['/^\\$/', 'font-family'],
        ignoreKeywords: ['/^[a-zA-Z0-9\\-]+$/'],
      },
    ],
  },
}
