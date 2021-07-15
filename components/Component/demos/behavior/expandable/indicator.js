define([], function () {
  return {
    title: '指示器组件',
    file: 'indicator',
    description:
      '通过 `expandable.indicator` 配置组件的可折叠状态的指示器（通常为图标），如果同时设置 `expandable.byIndicator` 为 true，则触发事件只在指示器上触发。设置指示器同时需要在组件的恰当位置调用组件实例的 `getExpandableIndicatorProps` 方法指定该指示器渲染的位置',
    demo: function () {
      let bodyRef = null,
        body2Ref = null

      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Panel',
            uistyle: 'bordered',
            header: {
              expandable: {
                byClick: true,
                target: () => {
                  return bodyRef
                },
                indicator: {
                  component: 'Icon',
                  expandable: {
                    expandedProps: {
                      type: 'up',
                    },
                    collapsedProps: {
                      type: 'down',
                    },
                  },
                },
              },
              onConfig: ({ inst }) => {
                inst.setProps({
                  caption: {
                    title: '点击整个标题部分都可以触发展开折叠行为',
                  },
                  tools: [inst.getExpandableIndicatorProps()],
                })
              },
            },
            body: {
              ref: (c) => {
                bodyRef = c
              },
              hidden: true,
              children: '面板内容',
            },
          },
          {
            component: 'Panel',
            uistyle: 'bordered',
            header: {
              expandable: {
                byClick: true,
                target: () => {
                  return body2Ref
                },
                byIndicator: true,
                indicator: {
                  component: 'Icon',
                  expandable: {
                    expandedProps: {
                      type: 'up',
                    },
                    collapsedProps: {
                      type: 'down',
                    },
                  },
                },
              },
              onConfig: ({ inst }) => {
                inst.setProps({
                  caption: {
                    title: '点击指示器（图标）触发展开折叠行为',
                  },
                  tools: [inst.getExpandableIndicatorProps()],
                })
              },
            },
            body: {
              ref: (c) => {
                body2Ref = c
              },
              hidden: true,
              children: '面板内容',
            },
          },
        ],
      }
    },
  }
})
