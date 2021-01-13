define([], function () {
  return {
    title: '单选',
    file: 'single',
    demo: function () {
      return {
        children: {
          component: 'Tree',
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
                {
                  title: 'Child Node3',
                  value: '0-0-3',
                },
              ],
            },
            {
              title: 'Node2',
              value: '0-1',
            },
          ],
          leafOnly: true,
          multiple: false,
          showline: true,
          selectedNodes: ['0-0-0-1'],
          onCheck: function (param) {
            console.log(
              `你选中了：${param.items}，当前触发的节点是${param.key}，它的值是${param.status}。`,
            )
          },
        },
      }
    },
  }
})
