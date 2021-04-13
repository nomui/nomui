define([], function () {
  return {
    title: '基础用法',
    file: 'methods',
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
                text: '获取选中节点',
                onClick: () => {
                  console.log(treeRef.getCheckedNodes())
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
            nodeCheckable: true,
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
