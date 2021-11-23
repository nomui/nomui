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
              placeholder: '输入 a 或 b 或 c ...',
            },
            // value: 6,
            ref: (c) => {
              treeSelectRef = c
            },
            options: [
              { text: 'aaaaa', value: 1 },
              { text: 'bbbbb', value: 2 },
              { text: 'ccccc', value: 3 },
              { text: 'ddddd', value: 4 },
              { text: 'eeeee', value: 5 },
              { text: 'fffff', value: 6 },
              { text: 'ggggg', value: 7 },
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
