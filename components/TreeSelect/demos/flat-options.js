define([], function () {
  return {
    title: '平面数据',
    file: 'flat-options',
    demo: function () {
      return {
        children: {
          component: 'TreeSelect',
          allowClear: true,
          treeDataFields: {
            key: 'key',
            text: 'text',
          },
          flatOptions: true,
          options: [
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
          value: '2.1',
        },
      }
    },
  }
})
