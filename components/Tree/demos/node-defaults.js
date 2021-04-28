define([], function () {
  return {
    title: '自定义节点',
    file: 'node-defaults',
    description: '通过 `nodeDefaults` 自定义节点配置',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          nodeDefaults: {
            _config: (inst) => {
              inst.setProps({
                data: {
                  icon: {
                    type: 'folder-filled',
                    styles: {
                      text: 'yellow',
                    },
                  },
                },
              })
            },
          },
          data: [
            {
              text: '节点 1',
              children: [
                {
                  text: '节点 1.1',
                  children: [
                    { text: '节点 1.1.1' },
                    { text: '节点 1.1.2' },
                    { text: '节点 1.1.3' },
                  ],
                },
              ],
            },
            {
              text: '节点 2',
              children: [{ text: '节点 2.1' }, { text: '节点 2.2' }],
            },
            {
              text: '节点 3',
              children: [{ text: '节点 3.1' }, { text: '节点 3.2' }],
            },
          ],
        },
      }
    },
  }
})
