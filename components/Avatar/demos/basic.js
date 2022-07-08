define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '可以自定义图标颜色及背景色',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Avatar',
            text: '小马',
          },
          {
            component: 'Avatar',
            text: '小马',
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#ff8787',
              },
            },
          },
        ],
      }
    },
  }
})
