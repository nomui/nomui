define([], function () {
  return {
    title: '按钮尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Button',
            text: 'xsmall',
            size: 'xsmall',
          },
          {
            component: 'Button',
            text: 'small',
            size: 'small',
            disabled: true,
          },
          {
            component: 'Button',
            text: 'default',
          },
          {
            component: 'Button',
            text: 'large',
            size: 'large',
          },
          {
            component: 'Button',
            text: 'xlarge',
            size: 'xlarge',
          },
        ],
      }
    },
  }
})
