define([], function () {
  return {
    title: '半星',
    file: 'allowHalf',
    demo: function () {
      return {
        component: 'Rate',
        allowHalf: true,
        value: 2.5,
      }
    },
  }
})
