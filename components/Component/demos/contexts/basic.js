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
                text: '获取上下文:theme & lang',
                type: 'link',
                onClick: ({ sender }) => {
                  const context = sender.getContext(['theme', 'lang'])
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
                value: '组件2(未设置上下文)',
              },
              {
                component: 'Button',
                text: '获取上下文:theme & lang',
                type: 'link',
                onClick: ({ sender }) => {
                  const context = sender.getContext(['theme', 'lang'])
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
                value: '组件3(点我弹出popup)',
                context: {
                  lang: 'en',
                },
                popup: {
                  children: {
                    component: 'Flex',
                    align: 'center',
                    cols: [
                      {
                        component: 'StaticText',
                        value:
                          'Popup会先查找自身祖先组件的上下文，没有则从自己触发组件开始向上查找',
                      },
                      {
                        component: 'Button',
                        text: '获取上下文:theme & lang',
                        type: 'link',
                        onClick: ({ sender }) => {
                          const context = sender.getContext(['theme', 'lang'])
                          console.log(context)
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
