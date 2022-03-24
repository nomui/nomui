define([], function () {
  return {
    title: '不同形状',
    description: '两种形状可选',
    file: 'shape',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            text: '小马',
            styles: {
              shape: 'round',
            },
          },
          {
            text: '小马',
            styles: {
              shape: 'square',
            },
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#4dabf7',
              },
            },
          },
        ],
        itemDefaults: {
          component: 'Avatar',
        },
      }
    },
  }
})
