define([], function () {
  return {
    title: '行列布局',
    file: 'rows-cols',
    description: "嵌套的 `Flex` 可以省略 `component: 'Flex'` 配置",
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            children: '第一行',
          },
          {
            children: {
              gap: 'medium',
              cols: [
                {
                  children: '第二行第一列',
                },
                {
                  children: '第二行第二列',
                },
              ],
            },
          },
          {
            children: '第三行',
          },
        ],
      }
    },
  }
})
