define([], function () {
  return {
    title: '可勾选',
    file: 'checkable',
    description: '通过 `nodeCheckable` 配置可勾选行为',
    demo: function () {
      let treeRef = null

      return {
        component: 'Rows',
        items: [
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: '获取选中节点键值数组',
                onClick: () => {
                  console.log(treeRef.getCheckedNodeKeys())
                },
              },
              {
                component: 'Button',
                text: '获取选中节点数据（树形）',
                onClick: () => {
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
            nodeCheckable: {
              checkedNodeKeys: ['层级 1', '层级 1.1', '层级 2.1'],
            },
            dataFields: {
              key: 'text',
            },
            data: [
              {
                text: '层级 1',
                children: [
                  { text: '层级 1.1', children: [{ text: '层级 1.1.1' }, { text: '层级 1.2' }] },
                ],
              },
              {
                text: '层级 2',
                children: [{ text: '层级 2.1' }, { text: '层级 2.2' }],
              },
            ],
          },
        ],
      }
    },
  }
})
