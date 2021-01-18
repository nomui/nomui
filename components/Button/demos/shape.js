define([], function () {
  return {
    title: '按钮形状',
    file: 'shape',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            text: 'normal',
          },
          {
            text: 'round',
            shape: 'round',
          },
          {
            text: 'circle',
            shape: 'circle',
          },
          {
            icon: 'plus',
            shape: 'round',
          },
          {
            icon: 'edit',
            shape: 'circle',
          },
        ],
        itemDefaults: {
          component: 'Button',
        },
      }
    },
  }
})
