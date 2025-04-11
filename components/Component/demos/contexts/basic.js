define([], function () {
  return {
    title: '基础上下文管理',
    file: 'basic',
    description: null,
    demo: function () {
      return {
        component: 'Group',
        context: {
          theme: 'light',
        },
        label: '根组件(theme:light)',
        fields: [
          {
            component: 'Group',
            context: {
              theme: 'dark',
            },
            inline: true,
            fields: [
              {
                component: 'StaticText',
                value: '组件1(theme:dark)',
              },
              {
                component: 'Button',
                type: 'link',
                text: '获取上下文:theme',
                onClick: ({ sender }) => {
                  const context = sender.getContext('theme')
                  console.log(context)
                },
              },
            ],
          },
          {
            component: 'Group',
            inline: true,
            fields: [
              {
                component: 'StaticText',
                value: '组件2(未设置theme)',
              },
              {
                component: 'Button',
                text: '获取上下文:theme',
                type: 'link',
                onClick: ({ sender }) => {
                  const context = sender.getContext('theme')
                  console.log(context)
                },
              },
            ],
          },
        ],
      }
    },
  }
})
