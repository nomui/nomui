define([], function () {
  return {
    title: '可搜索，本地数据',
    file: 'searchable-local',
    description:
      '配置了 `searchable`，则会启用搜索功能，默认不配置 `searchable.filter` 时会根据 option 的 text 进行匹配过滤，`searchable.placeholder` 可以配置搜索框的占位文字,`searchable.emptyTip` 可以配置搜索无结果时的提示内容',
    demo: function () {
      let selectRef = null
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Select',
            searchable: {
              placeholder: '输入 a 或 b 或 c ...',
              emptyTip: '没有找到匹配的选项',
            },
            // value: 6,
            ref: (c) => {
              selectRef = c
            },
            options: [
              { text: 'aaaaa', value: 0 },
              { text: 'aaaaaaaa', value: 1 },
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
                  console.log(selectRef.getValue())
                },
              },
              {
                component: 'Button',
                text: 'Set value',
                onClick() {
                  selectRef.setValue(3)
                },
              },
            ],
          },
        ],
      }
    },
  }
})
