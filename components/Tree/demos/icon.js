define([], function () {
  return {
    title: '节点图标',
    file: 'icon',
    description: '通过节点数据的 icon 字段配置节点图标',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          data: [
            {
              text: '节点 1',
              icon: 'folder',
              children: [
                {
                  text: '节点 1.1',
                  icon: 'folder',
                  children: [
                    { text: '节点 1.1.1', icon: 'file' },
                    { text: '节点 1.1.2', icon: 'file' },
                    { text: '节点 1.1.3', icon: 'file' },
                  ],
                },
              ],
            },
            {
              text: '节点 2',
              icon: 'folder',
              children: [
                { text: '节点 2.1', icon: 'file' },
                { text: '节点 2.2', icon: 'file' },
              ],
            },
            {
              text: '节点 3',
              icon: 'folder',
              children: [
                { text: '节点 3.1', icon: 'file' },
                { text: '节点 3.2', icon: 'file' },
              ],
            },
          ],
        },
      }
    },
  }
})
