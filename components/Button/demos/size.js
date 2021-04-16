define([], function () {
  return {
    title: '按钮尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            text: 'xsmall',
            size: 'xsmall',
          },
          {
            text: 'small',
            size: 'small',
          },
          {
            text: 'default',
          },
          {
            text: 'large',
            size: 'large',
          },
          {
            text: 'xlarge',
            size: 'xlarge',
          },
        ],
        itemDefaults: {
          component: 'Button',
        },
      }
    },
  }
})
