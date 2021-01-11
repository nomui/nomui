define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Panel',
            header: {
              caption: {
                title: '默认用法',
              },
            },
            body: {
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
              },
            },
          },
        ],
      }
    },
  }
})
