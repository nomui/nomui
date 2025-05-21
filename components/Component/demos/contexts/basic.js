define([], function () {
  return {
    title: '基础上下文管理',
    file: 'basic',
    description: `上下文提供了一种跨组件的数据共享方式，通常用来避免props的层层传递。上下文可以在组件树中向下传递，也可以在组件树中向上查找。上下文的值可以是任意类型的对象，通常用来传递一些全局配置，例如主题、语言等。`,
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Group',
            context: {
              theme: 'light',
              lang: 'ru',
            },
            label: '根组件(theme:light,lang:ru)',
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
                    value: '组件1(theme:dark)(监听theme和lang)',
                    contextListeners: {
                      theme: (args) => {
                        console.log('上下文theme发生变化', args)
                      },
                      lang: (args) => {
                        console.log('上下文lang发生变化', args)
                      },
                    },
                  },
                  {
                    component: 'Button',
                    text: '获取上下文:theme（获取单个上下文时直接返回其值）',
                    type: 'link',
                    onClick: ({ sender }) => {
                      // 获取单个上下文时直接返回其值
                      const context = sender.getContext('theme')
                      console.log(context)
                    },
                  },
                  {
                    component: 'Button',
                    text: '设置上下文(lang:en)',
                    type: 'link',
                    onClick: ({ sender }) => {
                      sender.setContext({
                        lang: 'en',
                      })
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
                    value: '组件2(未设置上下文)(监听theme和lang)',
                    contextListeners: {
                      theme: (args) => {
                        console.log('上下文theme发生变化', args)
                      },
                      lang: (args) => {
                        console.log('上下文lang发生变化', args)
                      },
                    },
                  },
                  {
                    component: 'Button',
                    text: '设置上下文(theme:purple)',
                    type: 'link',
                    onClick: ({ sender }) => {
                      sender.setContext({
                        theme: 'purple',
                      })
                    },
                  },
                  {
                    component: 'Button',
                    text: '获取多个上下文:theme & lang',
                    type: 'link',
                    onClick: ({ sender }) => {
                      // 获取多个上下文时返回一个对象
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
          },
          {
            attrs: {
              style: {
                paddingLeft: '190px',
                color: '#999',
              },
            },
            component: 'List',
            cols: 1,
            gutter: 'md',
            itemRender: ({ itemData }) => {
              return {
                children: itemData.text,
              }
            },
            data: [
              {
                text: `1. 每个组件可以传入 context，context 是一个对象，可以配置任意属性，例如 context:{theme:'light'}`,
              },
              {
                text: `2. 当对一个组件实例调用 getContext 方法时，会从它以及它父级节点往上查找，返回第一个符合参数条件的 context`,
              },
              {
                text: `3. 如果组件处于Popup内部，在向上查找的过程中会自动穿透Popup的触发器，从触发器继续向上查找。如果组件存在于 Modal 或者 Layer 等浮窗元素，它无法访问文档上不属于浮窗的 DOM 节点的 context。此时仍然需要在创建浮窗时将需要的 context 作为参数传给 Modal 或者 Layer。`,
              },
              {
                text: `4. 当组件不存在于文档树上时，全局上下文当中储存的该组件context也会被清理`,
              },
              {
                text: `5. 组件可以配置contextListeners来监听上下方变化，该配置与getContext遵循相同逻辑，如果组件自身没有配置对应key的上下文，会从组件树向上查找`,
              },
              {
                text: `6. 当组件被移除时，组件实例对应的监听器也会被移除`,
              },
            ],
          },
        ],
      }
    },
  }
})
