define([], function () {
  return {
    title: '远程搜索',
    file: 'remote',
    demo: function () {
      let autoCompleteRef = null
      return {
        component: 'Flex',
        rows: [
          {
            component: 'AutoComplete',
            onCreated: ({ inst }) => {
              autoCompleteRef = inst
            },
            propsMode: 'select',
            searchable: {
              placeholder: '请输入',
              onSearch: ({ inputValue }) => {
                return new Promise((resolve) => {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(() => {
                    if (!inputValue) return resolve([])
                    resolve([{ text: inputValue, value: `${inputValue}1234` }, { text: inputValue.repeat(2), value: `${inputValue.repeat(2)}1234` }])
                  }, 300)
                })
              },
            },
          },
          {
            component: 'Flex',
            gutter: 'medium',
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
                text: 'Set Value',
              },
            ],
          },
        ],
      }
    },
  }
})
