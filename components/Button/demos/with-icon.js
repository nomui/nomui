define([], function () {
  return {
    title: '带图标',
    file: 'with-icon',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            text: 'Add',
            icon: 'down',
          },
          {
            icon: 'up',
          },
          {
            text: 'Right icon',
            rightIcon: 'info-circle',
          },
        ],
        itemDefaults: {
          component: 'Button',
        },
      }
    },
  }
})
