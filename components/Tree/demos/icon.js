define([], function () {
  return {
    title: '节点图标和工具栏',
    file: 'icon',
    description:
      '通过节点数据的 icon 字段配置节点图标, tools 字段配置文本右侧工具栏（可通过函数返回，参数为`node`和`tree`）',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          data: [
            {
              text: '节点 1',
              icon: 'folder',
              tools: {
                render: ({ node, tree }) => {
                  return [
                    {
                      component: 'Button',
                      type: 'link',
                      text: '查看',
                      onClick({ event }) {
                        // eslint-disable-next-line
                        console.log(node, tree)
                        event.stopPropagation()
                      },
                    },
                    {
                      component: 'Button',
                      type: 'link',
                      text: '删除',
                      onClick({ event }) {
                        // eslint-disable-next-line
                        console.log(node, tree)
                        event.stopPropagation()
                      },
                    },
                  ]
                },
              },
              children: [
                {
                  text: '节点 1.1',
                  icon: 'folder',
                  tools: {
                    justify: 'end', // 控制x轴对齐方式
                    render: ({ node, tree }) => {
                      return [
                        {
                          component: 'Button',
                          type: 'link',
                          text: '更新',
                          onClick({ event }) {
                            // eslint-disable-next-line
                            console.log(node, tree)
                            event.stopPropagation()
                          },
                        },
                      ]
                    },
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
