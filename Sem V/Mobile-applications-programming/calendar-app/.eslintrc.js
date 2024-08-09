module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
  },
}
