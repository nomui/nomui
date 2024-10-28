define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          rows: [
            {
              component: 'TreeSelect',
              allowClear: true,
              treeDataFields: {
                key: 'value',
                text: 'title',
              },
              options: [
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
              value: '0-1',
            },
            {
              component: 'TreeSelect',
              label: '控制浮层宽度',
              popupWidth: 300,
              allowClear: true,
              treeDataFields: {
                key: 'value',
                text: 'title',
              },
              options: [
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
              value: '0-1',
            },
          ]
        }
      }
    },
  }
})
