define([], function () {
  return {
    title: '默认勾选',
    file: 'checkable-checked-keys',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          initExpandLevel: -1,
          nodeCheckable: {
            checkedKeys: ['1', '1.1', '2.1'],
          },
          nodes: [
            {
              text: '层级 1',
              key: '1',
              nodes: [
                {
                  text: '层级 1.1',
                  key: '1.1',
                  nodes: [
                    { text: '层级 1.1.1', key: '1.1.1' },
                    { text: '层级 1.2', key: '1.2' },
                  ],
                },
              ],
            },
            {
              text: '层级 2',
              key: '2',
              nodes: [
                { text: '层级 2.1', key: '2.1' },
                { text: '层级 2.2', key: '2.2' },
              ],
            },
          ],
        },
      }
    },
  }
})
