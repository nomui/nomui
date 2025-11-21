define([], function () {
  return {
    title: '多选',
    file: 'multiple',
    description:
      '配置了 `multiple`或`treeCheckable` 则开启多选。`treeCheckable`配置同`Tree`组件的`nodeCheckable`',
    demo: function () {
      let treeSelectRef = null
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            children: {
              component: 'TreeSelect',
              ref: (c) => {
                treeSelectRef = c
              },
              maxTagCount: 3,
              changeOnClose: true,
              onValueChange: ({ newValue }) => {
                console.log('onValueChange', newValue)
              },
              options: [
                {
                  text: '总经办',
                  value: '0-0',
                  children: [
                    {
                      text: '人事部',
                      value: '0-0-1',
                    },
                    {
                      text: '行政部',
                      value: '0-0-2',
                    },
                  ],
                },
                {
                  text: '技术中心',
                  value: '0-1',
                  children: [
                    {
                      text: '后端组',
                      value: '0-1-1',
                      children: [
                        {
                          text: '开发一组',
                          value: '0-1-1-1',
                        },
                        {
                          text: '开发二组',
                          value: '0-1-1-2',
                        },
                      ],
                    },
                    {
                      text: '前端组',
                      value: '0-1-2',
                    },
                  ],
                },
              ],
              value: ['0-0-1', '0-1-1'],
              treeCheckable: {
                showCheckAll: true,
              },
              includePartialChecked: false,
            },
          },
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Button',
                text: 'Get Value',
                onClick: () => {
                  // eslint-disable-next-line
                  console.log(treeSelectRef.getValue())
                },
              },
              {
                component: 'Button',
                text: 'Set value',
                onClick() {
                  treeSelectRef.setValue(['0-1-2'])
                },
              },
            ],
          },
        ],
      }
    },
  }
})
