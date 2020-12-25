module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    nomui: true,
    define: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-useless-constructor': 'warn',
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
    'import/no-amd': 0,
    'prefer-rest-params': 0,
    'func-names': 0,
    'object-shorthand': 0,
    'no-new': 0,
    'no-plusplus': 0,
  },
}
