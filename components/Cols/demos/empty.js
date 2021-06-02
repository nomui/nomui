define([], function () {
  return {
    title: '显示空信息',
    file: 'empty',
    demo: function () {
      return {
        component: 'Cols',
        showEmpty: { size: 'large' },
      }
    },
  }
})
