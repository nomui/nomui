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
            size: 'xsmall',
          },
          {
            text: '小马',
            size: 'small',
          },
          {
            text: '小马',
          },
          {
            text: '小马',
            size: 'large',
          },
          {
            text: '小马',
            size: 'xlarge',
          },
        ],
        itemDefaults: {
          component: 'Avatar',
        },
      }
    },
  }
})
