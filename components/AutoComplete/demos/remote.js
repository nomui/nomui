define([], function () {
  return {
    title: '远程搜索',
    file: 'remote',
    demo: function () {
      let autoCompleteRef = null, autoCompleteRef2 = null
      return {
        component: 'Flex',
        rows: [
          {
            component: 'AutoComplete',
            onCreated: ({ inst }) => {
              autoCompleteRef = inst
            },
            label: '独立搜索框',
            searchable: {
              placeholder: '请输入',
              onSearch: ({ inputValue }) => {
                return new Promise((resolve) => {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(() => {
                    if (!inputValue) return resolve([])
                    resolve([{ value: inputValue }, { value: inputValue.repeat(2) }])
                  }, 300)
                })
              },
            },
          },
          {
            component: 'AutoComplete',
            onCreated: ({ inst }) => {
              autoCompleteRef2 = inst
            },
            label: '共享搜索框',
            searchable: {
              sharedInput: true,
              placeholder: '请输入',
              onSearch: ({ inputValue }) => {
                return new Promise((resolve) => {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(() => {
                    if (!inputValue) return resolve([])
                    resolve([{ value: inputValue }, { value: inputValue.repeat(2) }])
                  }, 300)
                })
              },
            },
          },
          {
            component: 'Flex',
            gutter: 'medium',
            justify: 'center',
            cols: [
              {
                component: 'Button',
                text: 'Get Value',
                onClick: () => {
                  new nomui.Message({
                    content: `值为 ${autoCompleteRef.getValue()}`,
                    type: 'info',
                  })
                },
              },
              {
                component: 'Button',
                text: 'Get Value2',
                onClick: () => {
                  new nomui.Message({
                    content: `值为 ${autoCompleteRef2.getValue()}`,
                    type: 'info',
                  })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
