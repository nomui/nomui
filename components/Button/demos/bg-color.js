define([], function () {
  return {
    title: '不同颜色',
    file: 'bg-color',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: 'Primary',
            styles: {
              color: 'primary',
            },
          },
          {
            component: 'Button',
            text: 'Info',
            styles: {
              color: 'info',
            },
          },
          {
            component: 'Button',
            text: 'primary-outline',
            rightIcon: 'arrow-down',
            styles: {
              color: 'primary-outline',
            },
          },
        ],
      }
    },
  }
})
