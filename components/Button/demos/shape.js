define([], function () {
  return {
    title: '按钮形状',
    file: 'shape',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Button',
            text: 'normal',
          },
          {
            component: 'Button',
            text: 'round',
            shape: 'round',
          },
          {
            component: 'Button',
            text: 'circle',
            shape: 'circle',
          },
          {
            component: 'Button',
            icon: 'plus',
            shape: 'round',
          },
          {
            component: 'Button',
            icon: 'edit',
            shape: 'circle',
          },
        ],
      }
    },
  }
})
