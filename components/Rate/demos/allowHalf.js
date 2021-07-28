define([], function () {
  return {
    title: '半星',
    file: 'basic',
    demo: function () {
      return {
        component: 'Rate',
        allowHalf: true,
        value: 2.5,
      }
    },
  }
})
