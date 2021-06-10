define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            children: '第一行',
          },
          {
            children: {
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
