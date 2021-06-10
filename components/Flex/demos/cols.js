define([], function () {
  return {
    title: '列布局',
    file: 'cols',
    demo: function () {
      return {
        component: 'Flex',
        cols: [
          {
            children: '第一列',
          },
          {
            children: '第二列',
          },
          {
            children: '第三列',
          },
        ],
      }
    },
  }
})
