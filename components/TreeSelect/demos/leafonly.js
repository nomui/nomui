define([], function () {
  return {
    title: '只允许叶子层级',
    file: 'leafonly',
    demo: function () {
      return {
        children: {
          component: 'TreeSelect',
          treeData: [
            {
              title: 'Node1',
              value: '0-0',
              children: [
                {
                  title: 'Child Node1',
                  value: '0-0-1',
                },
                {
                  title: 'Child Node2',
                  value: '0-0-2',
                  children: [
                    {
                      title: 'Child Child Node1',
                      value: '0-0-0-1',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Node2',
              value: '0-1',
            },
          ],
          selected: ['0-0-1', '0-1'],
          leafOnly: true,
        },
      }
    },
  }
})
