define([], function () {
  return {
    title: '节点图标和工具栏',
    file: 'icon',
    description: '通过节点数据的 icon 字段配置节点图标, tools 字段配置文本右侧工具栏',
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
                  tools: {
                    component: 'Icon',
                    type: 'info-circle',
                    tooltip: 'tools 中可以配置任意组件',
                  },
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
              tools: {
                component: 'Button',
                type: 'link',
                text: '按钮跳转查看',
              },
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
