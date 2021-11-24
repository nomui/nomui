define([], function () {
  return {
    title: '可搜索，本地数据',
    file: 'searchable-local',
    description:
      '配置了 `searchable`，则会启用搜索功能，默认不配置 `searchable.filter` 时会根据 option 的 text 进行匹配过滤，`searchable.placeholder` 可以配置搜索框的占位文字',
    demo: function () {
      let treeSelectRef = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'TreeSelect',
            searchable: {
              placeholder: '默认根据数据的text值搜索',
            },
            // value: 6,
            ref: (c) => {
              treeSelectRef = c
            },
            options: [
              {
                text: 'Node1',
                value: '0-0',
                children: [
                  {
                    text: 'Child Node1-1',
                    value: '0-0-1',
                  },
                  {
                    text: 'Child Node1-2',
                    value: '0-0-2',
                    children: [
                      {
                        text: 'Child Child Node1',
                        value: '0-0-0-1',
                      },
                    ],
                  },
                ],
              },
              {
                text: 'Node2',
                value: '0-1',
              },
            ],
            onValueChange(changed) {
              // eslint-disable-next-line
              console.log(changed)
            },
          },
          {
            component: 'Cols',
            items: [
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
                  treeSelectRef.setValue(3)
                },
              },
            ],
          },
        ],
      }
    },
  }
})
