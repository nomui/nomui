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
            showCheckAll: true,
            options: [
              {
                text: '节点 1',
                value: '1',
                children: [
                  {
                    text: '节点 1.1',
                    disabled: true,
                    value: '1.1',
                    children: [{ text: '节点 1.1.1', value: '1.1.1' }],
                  },
                ],
              },
              {
                text: '节点 2',
                value: '2',
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
          { component: 'Divider' },
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
                    disabled: true,
                    children: [{ text: '节点 1.1.1', value: '1.1.1' }],
                  },
                ],
              },
              {
                text: '节点 2',
                value: '2',
                disabled: true,
              },
              {
                text: '节点 3',
                value: '3',
                children: [
                  { text: '节点 3.1', value: '3.1', disabled: true },
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
