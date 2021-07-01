define([], function () {
  return {
    title: '列布局',
    file: 'cols',
    description:
      '配置 `cols` 数组，会从左到右按列排列子组件，同时配置 `rows` 和 `cols` 时只有 rows 会生效',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
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
