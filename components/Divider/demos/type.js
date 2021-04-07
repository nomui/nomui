define([], function () {
  return {
    title: '垂直分割线',
    subtitle: '使用 type="vertical" 设置为行内的垂直分割线。',
    file: 'type',
    demo: function () {
      return {
        component: 'Container',
        breakpoint: 'xxl',
        children: [
          {
            component: 'Button',
            type: 'link',
            text: 'link',
          },
          {
            component: 'Divider',
            type: 'vertical',
          },
          {
            component: 'Button',
            type: 'link',
            text: 'link',
          },
          {
            component: 'Divider',
            type: 'vertical',
          },
          {
            component: 'Button',
            type: 'link',
            text: 'link',
          },
        ],
      }
    },
  }
})
