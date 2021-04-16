define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '通过 `data` 配置树形数据',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          data: [
            {
              text: '层级 1',
              children: [
                {
                  text: '层级 1.1',
                  children: [
                    { text: '层级 1.1.1' },
                    { text: '层级 1.1.2' },
                    { text: '层级 1.1.3' },
                  ],
                },
              ],
            },
            {
              text: '层级 2',
              children: [{ text: '层级 2.1' }, { text: '层级 2.2' }],
            },
            {
              text: '层级 3',
              children: [{ text: '层级 3.1' }, { text: '层级 3.2' }],
            },
          ],
        },
      }
    },
  }
})
