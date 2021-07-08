define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description: '通过 `expandable` 配置组件的可展开行为',
    demo: function () {
      let contentRef = null
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Button',
            expandable: {
              byClick: true,
              target: () => {
                return contentRef
              },
              expandedProps: {
                text: '折叠',
                rightIcon: 'up',
              },
              collapsedProps: {
                text: '展开',
                rightIcon: 'down',
              },
            },
          },
          {
            ref: (c) => {
              contentRef = c
            },
            hidden: true,
            children: '我是内容',
          },
        ],
      }
    },
  }
})
