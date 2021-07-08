define([], function () {
  return {
    title: '鼠标悬浮触发',
    file: 'by-hover',
    description: '设置 `expandable.byHover` 为 ture，则通过鼠标悬浮控制展开行为',
    demo: function () {
      let contentRef = null
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Button',
            expandable: {
              byHover: true,
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
