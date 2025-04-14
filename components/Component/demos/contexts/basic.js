define([], function () {
  return {
    title: '基础上下文管理',
    file: 'basic',
    description: `每个组件可以传入 context，context 是一个对象，可以配置任意属性，例如 context:{theme:'light'}，当对一个组件实例调用 getContext 方法时，会从它以及它父级节点往上查找，返回第一个符合参数条件的 context，此配置通常用于避免逐层传递参数的麻烦。注意如果组件存在于 Modal 或者 Layer 等浮窗元素，它无法访问文档上不属于浮窗的 DOM 节点的 context。此时仍然需要在创建浮窗时将需要的 context 作为参数传给 Modal 或者 Layer。另外当组件不存在于文档树上时，全局上下文当中储存的该组件context也会被清理`,
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
