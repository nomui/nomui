define([], function () {
  return {
    title: '不同尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            text: 'xs',
            size: 'xs',
          },
          {
            text: 'sm',
            size: 'sm',
          },
          {
            text: 'default',
          },
          {
            text: 'lg',
            size: 'lg',
          },
          {
            text: 'xl',
            size: 'xl',
          },
        ],
        itemDefaults: {
          component: 'Button',
        },
      }
    },
  }
})
