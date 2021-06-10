define([], function () {
  return {
    title: '行布局',
    file: 'rows',
    demo: function () {
      return {
        component: 'Flex',
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
