define([], function () {
  return {
    title: '可排序',
    file: 'sortable',
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
                text: '获取所有数据（树形）',
                onClick: () => {
                  // eslint-disable-next-line
                  console.log(treeRef.getData())
                },
              },
              {
                component: 'Button',
                text: '获取勾选数据（树形）',
                onClick: () => {
                  // eslint-disable-next-line
                  console.log(treeRef.getCheckedNodesData())
                },
              },
            ],
          },
          {
            component: 'Tree',
            ref: (c) => {
              treeRef = c
            },
            initExpandLevel: -1,
            sortable: true,
            nodeCheckable: true,
            dataFields: {
              key: 'text',
            },
            data: [
              {
                text: '节点 1',
                children: [
                  { text: '节点 1.1', children: [{ text: '节点 1.1.1' }, { text: '节点 1.1.2' }] },
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
