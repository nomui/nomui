define([], function () {
  return {
    title: '幽灵按钮',
    file: 'ghost',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        styles: {
          // color: 'gray',
          padding: '1',
        },
        cols: [
          {
            component: 'Button',
            text: 'primary',
            type: 'primary',
            ghost: true,
          },
          {
            component: 'Button',
            text: 'default',
            type: 'default',
            ghost: true,
          },
          {
            component: 'Button',
            text: 'dashed',
            type: 'dashed',
            ghost: true,
          },

        ],
      }
    },
  }
})
