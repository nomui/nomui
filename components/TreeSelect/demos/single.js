define([], function () {
  return {
    title: '单选',
    file: 'single',
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
          selectedNodes: '0-0-1',
          multiple: false,
          leafOnly: true,
        },
      }
    },
  }
})
