define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Avatar',
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
            badge: true,
          },
          {
            component: 'Avatar',
            text: 'HH',
            styles: {
              shape: 'square',
            },
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#ff922b',
              },
            },
            badge: {
              text: 'VIP',
            },
          },
          {
            component: 'Badge',
            text: 'badge',
          },
          {
            component: 'Badge',
            text: 0,
            icon: 'eye',
          },
          {
            component: 'Badge',
            text: '小号尺寸',
            size: 'xs',
          },
          {
            component: 'Badge',
            number: 0,
            color: 'olive',
          },
          {
            component: 'Button',
            text: '按钮带圆点',
            badge: true,
          },
          {
            component: 'Button',
            text: '按钮带圆点数字',
            badge: {
              number: 1000,
              overflowCount: 99,
            },
          },
          {
            component: 'Button',
            text: '自定义角标颜色',
            badge: {
              styles: {
                color: 'success',
              },
            },
          },
        ],
      }
    },
  }
})
