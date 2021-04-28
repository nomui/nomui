define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '通过 `data` 配置树形数据',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          initExpandLevel: 1,
          data: [
            {
              text: '节点 1',
              children: [
                {
                  text: '节点 1.1',
                  children: [
                    { text: '节点 1.1.1' },
                    { text: '节点 1.1.2' },
                    { text: '节点 1.1.3' },
                  ],
                },
              ],
            },
            {
              text: '节点 2',
              children: [{ text: '节点 2.1' }, { text: '节点 2.2' }],
            },
            {
              text: '节点 3',
              children: [{ text: '节点 3.1' }, { text: '节点 3.2' }],
            },
          ],
        },
      }
    },
  }
})
