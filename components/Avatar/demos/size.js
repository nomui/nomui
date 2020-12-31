define([], function () {
  return {
    title: '不同尺寸',
    description: '头像有四种尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            text: '小马',
            size: 'xs',
          },
          {
            text: '小马',
            size: 'sm',
          },
          {
            text: '小马',
          },
          {
            text: '小马',
            size: 'lg',
          },
          {
            text: '小马',
            size: 'xl',
          },
        ],
        itemDefaults: {
          component: 'Avatar',
        },
      }
    },
  }
})
