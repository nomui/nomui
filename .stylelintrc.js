module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  'order/order': [],
  rules: {
    'order/properties-order': null,
    'declaration-bang-space-before': null,
    'function-name-case': null,
    'plugin/declaration-block-no-ignored-properties': null,
    'no-duplicate-selectors': null
  },
}
