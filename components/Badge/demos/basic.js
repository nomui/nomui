define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
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
              overflowCount: 999,
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
