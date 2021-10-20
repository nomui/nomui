define([], function () {
  return {
    title: '列布局换行',
    file: 'cols-wrap',
    description: '配置 `cols` 数组，且配置 `wrap` 为 true，会从左到右按列排列子组件并换行',
    demo: function () {
      return {
        component: 'Flex',
        gutter: 'medium',
        wrap: true,
        cols: [
          {
            span: 4,
            children: '第一列',
          },
          {
            span: 4,
            children: '第二列',
          },
          {
            span: 4,
            children: '第三列',
          },
          {
            span: 4,
            children: '第四列',
          },
          {
            span: 4,
            children: '第五列',
          },
          {
            span: 4,
            children: '第六列',
          },
        ],
      }
    },
  }
})
