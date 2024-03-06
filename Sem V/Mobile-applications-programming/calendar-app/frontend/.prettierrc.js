module.exports = {
  singleQuote: true,
  arrowParens: 'always',
  semi: false,
  trailingComma: 'all',
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 80,
  overrides: [
    {
      files: '*.tsx',
      options: {
        semi: true,
        useTabs: false,
        tabWidth: 2,
        jsxSingleQuote: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        singleQuote: true,
        bracketSpacing: true,
        trailingComma: 'all',
      },
    },
  ],
}
