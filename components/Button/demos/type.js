define([], function () {
  return {
    title: '按钮类型',
    file: 'type',
    description:
      '按钮有6种类型：主按钮、次按钮、虚线按钮、块状按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            gap: 'small',
            cols: [
              {
                component: 'Button',
                text: 'primary',
                type: 'primary',
              },
              {
                component: 'Button',
                text: 'default',
              },
              {
                component: 'Button',
                text: 'borderless',
                borderless: true
              },
              {
                component: 'Button',
                text: 'dashed',
                type: 'dashed',
              },
              {
                component: 'Button',
                text: 'text',
                type: 'text',
              },
              {
                component: 'Button',
                text: 'link',
                type: 'link',
              },
            ],
          },
          {
            children: {
              component: 'Button',
              text: 'block',
              type: 'primary',
              block: true
            },
          }
        ]
      }
    },
  }
})
