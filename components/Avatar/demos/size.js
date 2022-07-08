define([], function () {
  return {
    title: '不同尺寸',
    description: '头像有四种尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Avatar',
            text: '小马',
            size: 'xsmall',
          },
          {
            component: 'Avatar',
            text: '小马',
            size: 'small',
          },
          {
            component: 'Avatar',
            text: '小马',
          },
          {
            component: 'Avatar',
            text: '小马',
            size: 'large',
          },
          {
            component: 'Avatar',
            text: '小马',
            size: 'xlarge',
          },
        ],
      }
    },
  }
})
