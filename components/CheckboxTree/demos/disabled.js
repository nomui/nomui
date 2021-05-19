define([], function () {
  return {
    title: '禁用',
    file: 'disabled',
    demo: function () {
      return {
        children: [
          {
            component: 'CheckboxTree',
            disabled: true,
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
            onValueChange: ({ oldValue, newValue }) => {
              console.log(oldValue, newValue)
            },
          },
        ],
      }
    },
  }
})
