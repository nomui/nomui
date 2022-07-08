define([], function () {
  return {
    title: '带图标',
    file: 'with-icon',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Button',
            text: 'Add',
            icon: 'down',
          },
          {
            component: 'Button',
            icon: 'up',
          },
          {
            component: 'Button',
            text: 'Right icon',
            rightIcon: 'info-circle',
          },
        ],
      }
    },
  }
})
