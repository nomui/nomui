define([], function () {
  return {
    title: '可搜索，本地数据',
    file: 'searchable-local',
    description:
      '配置了 `searchable`，则会启用搜索功能，默认不配置 `searchable.filter` 时会根据 option 的 text 进行匹配过滤，`searchable.placeholder` 可以配置搜索框的占位文字',
    demo: function () {
      let treeSelectRef = null
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'TreeSelect',
            searchable: {
              placeholder: '默认根据数据的text值搜索',
            },
            initExpandLevel: 0,
            // value: 6,
            ref: (c) => {
              treeSelectRef = c
            },
            // multiple: true,
            options: [
              {
                text: '一级-1',
                value: '0-0',
                children: [
                  {
                    text: '二级-1',
                    value: '0-0-1',
                  },
                  {
                    text: '二级-2',
                    value: '0-0-2',
                    children: [
                      {
                        text: '三级-1',
                        value: '0-0-0-1',
                        children: [
                          {
                            text: '四级-1',
                            value: '0-0-0-0-1',
                          },
                          {
                            text: '四级-2',
                            value: '0-0-0-0-2',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                text: '一级-2',
                value: '0-1',
              },
            ],
            onValueChange(changed) {
              // eslint-disable-next-line
              console.log(changed)
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
                  treeSelectRef.setValue('0-0-0-0-1')
                },
              },
            ],
          },
        ],
      }
    },
  }
})
