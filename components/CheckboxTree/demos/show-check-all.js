define([], function () {
  return {
    title: '显示全选框',
    file: 'show-check-all',
    demo: function () {
      return {
        children: [
          {
            component: 'CheckboxTree',
            showCheckAll: true,
            options: [
              {
                text: '节点 1',
                value: '1',
                children: [
                  {
                    text: '节点 1.1',
                    value: '1.1',
                    children: [
                      { text: '节点 1.1.1', value: '1.1.1' },
                      { text: '节点 1.1.2', value: '1.1.2' },
                      { text: '节点 1.1.3', value: '1.1.3' },
                    ],
                  },
                ],
              },
              {
                text: '节点 2',
                value: '2',
                children: [
                  { text: '节点 2.1', value: '2.1', children: [] },
                  { text: '节点 2.2', value: '2.2' },
                ],
              },
              {
                text: '节点 3',
                value: '3',
                children: [
                  { text: '节点 3.1', value: '3.1' },
                  { text: '节点 3.2', value: '3.2' },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
