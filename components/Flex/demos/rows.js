define([], function () {
  return {
    title: '行布局',
    file: 'rows',
    description: '配置 `rows` 数组，会从上到下按行排列子组件',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            children: '第一行',
          },
          {
            children: '第二行',
          },
          {
            children: '第三行',
          },
        ],
      }
    },
  }
})
