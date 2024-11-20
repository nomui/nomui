define([], function () {
  return {
    title: '远程搜索',
    file: 'remote',
    description: '当同时配置了optionFields.text与optionFields.value，默认使用text作为搜索关键字，使用value作为取值方式，如果没有value（手动输入）时则取值字面text',
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
            optionFields: {
              text: 'text',
              value: 'value'
            },
            searchable: {
              sharedInput: true,
              placeholder: '请输入',
              onSearch: ({ inputValue }) => {
                return new Promise((resolve) => {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(() => {
                    if (!inputValue) return resolve([])
                    resolve([{ text: inputValue.repeat(3), value: '001', }, { text: inputValue.repeat(2), value: '002', }])
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
                text: 'Set Value2',
                onClick: () => {
                  autoCompleteRef2.setValue('002')
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
