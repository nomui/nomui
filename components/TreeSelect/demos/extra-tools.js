define([], function () {
  return {
    title: '额外工具栏',
    file: 'extra-tools',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'TreeSelect',
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
            value: ['0-0', '0-0-1', '0-1-1'],
            treeCheckable: {
              cascadeCheckParent: true,
              showCheckAll: true,
              // cascadeUncheckChildren: false
            },
            extraTools: ({ inst, popup }) => {
              return {
                component: 'Flex',
                cols: [
                  {
                    component: 'Button',
                    size: 'small',
                    type: 'link',
                    icon: 'plus',
                    text: '新建项目',
                    onClick: () => {
                      // do something
                      console.log(inst.props)
                      popup.hide()
                    },
                  },
                  {
                    component: 'Button',
                    size: 'small',
                    type: 'link',
                    icon: 'plus',
                    text: '新建关联',
                    onClick: () => {
                      // do something
                      console.log(inst.props)
                      popup.hide()
                    },
                  },
                ],
              }
            },
          },
        ],
      }
    },
  }
})
