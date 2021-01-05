define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Badge',
            text: '默认',
          },
          {
            component: 'Badge',
            text: '带图标',
            icon: 'plus',
            styles: {
              color: 'primary',
            },
          },
          {
            component: 'Badge',
            text: '带数字',
            number: '5',
          },
          {
            component: 'Badge',
            text: '圆形',
            type: 'round',
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
              number: 105,
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
