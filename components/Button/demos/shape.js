define([], function () {
  return {
    title: '不同形状',
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
            styles: {
              shape: 'round',
            },
          },
          {
            text: 'circle',
            styles: {
              shape: 'circle',
            },
          },
          {
            icon: 'plus',
            styles: {
              shape: 'round',
            },
          },
          {
            icon: 'edit',
            styles: {
              shape: 'circle',
            },
          },
        ],
        itemDefaults: {
          component: 'Button',
        },
      }
    },
  }
})
