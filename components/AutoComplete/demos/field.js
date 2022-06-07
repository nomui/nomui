define([], function () {
  return {
    title: '选择模式',
    file: 'select',
    description: 'select模式，只能匹配option中的值。',
    demo: function () {
      let autoCompleteRef = null
      return {
        component: 'Flex',
        rows: [
          {
            component: 'AutoComplete',
            mode: 'select',
            valueField: 'code',
            value: 4,
            onCreated: ({ inst }) => {
              autoCompleteRef = inst
            },
            onSelect: (v, o) => {
              // eslint-disable-next-line no-console
              console.log(v, o)
            },
            options: [
              { value: 'a', code: 1 },
              { value: 'aa', code: 2 },
              { value: 'ab', code: 3 },
              { value: 'aba', code: 4 },
              { value: 'ac', code: 5 },
              { value: 'aad', code: 6 },
              { value: 'aef', code: 7 },
              { value: 'ag', code: 8 },
              { value: 'ai', code: 9 },
              { value: 'bo', code: 10 },
              { value: 'ffc', code: 11 },
            ],
          },
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Button',
                text: '获取值',
                type: 'primary',
                onClick: () => {
                  new nomui.Message({
                    content: `${autoCompleteRef.getValue()}`,
                    type: 'info',
                  })
                },
              },
              {
                component: 'Button',
                text: '设置值',
                onClick: () => {
                  autoCompleteRef.setValue(6)
                },
              },
            ],
          },
        ],
      }
    },
  }
})
