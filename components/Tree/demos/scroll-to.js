define([], function () {
  return {
    title: '滚动到某个节点',
    file: 'scroll-to',
    demo: function () {
      let treeRef = null
      return {
        attrs: {
          style: {
            height: '200px',
          },
        },
        children: {
          component: 'Panel',
          fit: true,
          header: {
            nav: [
              {
                component: 'Button',
                text: '滚动到节点 1.1.3',
                onClick: () => {
                  treeRef.scrollTo('节点 1.1.3')
                },
              },
              {
                component: 'Button',
                text: '选择并滚动到节点 2.1',
                onClick: () => {
                  // treeRef.selectNode('节点 2.1')
                  treeRef.checkNode(['节点 2.1', '节点 1.1', '节点 2.1'])
                },
              },
            ],
          },
          body: {
            children: {
              component: 'Tree',
              ref: (c) => {
                treeRef = c
              },
              dataFields: {
                key: 'text',
              },
              nodeCheckable: {
                showCheckAll: true,
              },
              data: [
                {
                  text: '节点 1',
                  children: [
                    {
                      text: '节点 1.1',
                      children: [
                        { text: '节点 1.1.1', disabled: true },
                        { text: '节点 1.1.2' },
                        { text: '节点 1.1.3' },
                      ],
                    },
                  ],
                },
                {
                  text: '节点 2',
                  children: [{ text: '节点 2.1', disabled: false, children: [] }, { disabled: true, text: '节点 2.2' }],
                },
                {
                  text: '节点 3',
                  children: [{ text: '节点 3.1' }, { text: '节点 3.2' }],
                },
              ],
            },
          },
        },
      }
    },
  }
})
