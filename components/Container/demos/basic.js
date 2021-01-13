define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Container',
            breakpoint: 'xxl',
            styles: {
              border: true,
            },
            children:
              '这是一个容器，它会相对于父层级居中放置，并且根据BreakPoint配置以及窗口大小自动处理自身宽度',
          },
          {
            component: 'Container',
            breakpoint: 'md',
            styles: {
              border: true,
            },
            children:
              '这是一个容器，它会相对于父层级居中放置，并且根据BreakPoint配置以及窗口大小自动处理自身宽度',
          },
          {
            component: 'Container',
            breakpoint: 'md',
            fluid: true,
            styles: {
              border: true,
            },
            children:
              '这是一个容器，它会相对于父层级居中放置，因为fluid设置为true,它始终占据百分百宽度',
          },
        ],
      }
    },
  }
})
