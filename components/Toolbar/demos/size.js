define([], function () {
  return {
    title: '尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Toolbar',
        visibleItems: 1,
        size: 'small',
        items: [
          {
            text: '按钮1',
          },
          {
            text: '按钮2',
          },
          {
            text: '按钮3',
          },
          {
            text: '按钮4',
          },
        ],
      }
    },
  }
})
