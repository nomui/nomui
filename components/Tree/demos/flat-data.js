define([], function () {
  return {
    title: '平面数据',
    file: 'flat-data',
    description:
      '设置 `flatData` 为 true 可使用普通数组做为树组件的数据，组件会根据配置的 `dataFields` 来构造树形结构的数据',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          flatData: true,
          data: [
            {
              key: '1',
              text: '节点 1',
            },
            {
              key: '1.1',
              parentKey: '1',
              text: '节点 1.1',
            },
            {
              key: '2',
              text: '节点 2',
            },
            {
              key: '2.1',
              parentKey: '2',
              text: '节点 2.1',
            },
            {
              key: '2.2',
              parentKey: '2',
              text: '节点 2.2',
            },
            {
              key: '3',
              text: '节点 3',
            },
            {
              key: '3.1',
              parentKey: '3',
              text: '节点 3.1',
            },
            {
              key: '3.2',
              parentKey: '3',
              text: '节点 3.2',
            },
            {
              key: '1.1.1',
              parentKey: '1.1',
              text: '节点 1.1.1',
            },
            {
              key: '1.1.2',
              parentKey: '1.1',
              text: '节点 1.1.2',
            },
            {
              key: '1.1.3',
              parentKey: '1.1',
              text: '节点 1.1.3',
            },
          ],
        },
      }
    },
  }
})
