define([], function () {
  return {
    title: '展开节点',
    file: 'expand-to',
    description: '通过调用 expandTo 方法展开特定节点',
    demo: function () {
      let treeRef = null

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Button',
                text: '展开节点1',
                onClick: () => {
                  treeRef.expandTo('节点 1')
                },
              },
              {
                component: 'Button',
                text: '展开节点1.1',
                onClick: () => {
                  treeRef.expandTo('节点 1.1')
                },
              },
              {
                component: 'Button',
                text: '展开节点2',
                onClick: () => {
                  treeRef.expandTo('节点 2')
                },
              },
            ],
          },
          {
            component: 'Tree',
            ref: (c) => {
              treeRef = c
            },
            initExpandLevel: 0,
            expandable: { byIndicator: true },
            dataFields: {
              key: 'text',
            },
            data: [
              {
                text: '节点 1',
                children: [
                  { text: '节点 1.1', children: [{ text: '节点 1.1.1' }, { text: '节点 1.1.2' }] },
                  { text: '节点 1.2' },
                ],
              },
              {
                text: '节点 2',
                children: [{ text: '节点 2.1' }, { text: '节点 2.2' }],
              },
            ],
          },
        ],
      }
    },
  }
})
