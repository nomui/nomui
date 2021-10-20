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
            key: 'id',
            text: 'name',
          },
          flatOptions: true,
          value: '2.1',
          onCreated({inst}) {
            inst.update({
              options: [
                {
                  id: '1',
                  name: '节点 1',
                },
                {
                  id: '1.1',
                  parentKey: '1',
                  name: '节点 1.1',
                },
                {
                  id: '2',
                  name: '节点 2',
                },
                {
                  id: '2.1',
                  parentKey: '2',
                  name: '节点 2.1',
                },
                {
                  id: '2.2',
                  parentKey: '2',
                  name: '节点 2.2',
                },
                {
                  id: '3',
                  name: '节点 3',
                },
                {
                  id: '3.1',
                  parentKey: '3',
                  name: '节点 3.1',
                },
                {
                  id: '3.2',
                  parentKey: '3',
                  name: '节点 3.2',
                },
                {
                  id: '1.1.1',
                  parentKey: '1.1',
                  name: '节点 1.1.1',
                },
                {
                  id: '1.1.2',
                  parentKey: '1.1',
                  name: '节点 1.1.2',
                },
                {
                  id: '1.1.3',
                  parentKey: '1.1',
                  name: '节点 1.1.3',
                },
              ],
            })
          }
        },
      }
    },
  }
})
