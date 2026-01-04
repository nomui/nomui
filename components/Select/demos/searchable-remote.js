define([], function () {
  return {
    title: '可搜索，异步数据',
    file: 'searchable-remote',
    demo: function () {
      let select = null
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Select',
            searchable: {
              sharedInput: true,
              placeholder: '输入 a 或 b 或 c ...',
              filter: ({ inputValue }) => {
                return new Promise(function (resolve) {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(function () {
                    resolve([{ text: inputValue, value: inputValue }])
                  }, 300)
                })
              },
            },
            // value: 6,
            ref: (c) => {
              select = c
            },
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
                  console.log(select.getValue())
                },
              },
              {
                component: 'Button',
                text: 'Set value',
                onClick() {
                  select.setValue(3)
                },
              },
            ],
          },
        ],
      }
    },
  }
})
