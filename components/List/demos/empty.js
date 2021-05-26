define([], function () {
  return {
    title: '显示空信息',
    file: 'empty',
    demo: function () {
      return {
        component: 'List',
        gutter: 'md',
        showEmpty: {
          size: 'large',
        },
      }
    },
  }
})
