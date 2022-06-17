define([], function () {
  return {
    title: '搜索筛选',
    file: 'filterOption',
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
            label: '搜索筛选',
            propsMode: 'select',
            options: [
              { text: 'a', value: 1 },
              { text: 'A', value: 2 },
              { text: 'aa', value: 11 },
              { text: 'AA', value: 13 },
              { text: 'aaa', value: 41 },
              { text: 'AAA', value: 12 },
              { text: 'aaaa', value: 111 },
              { text: 'AAAA', value: 15 },
              { text: 'aaaaa', value: 61 },
              { text: 'AAAAA', value: 134 },
            ],
            filterOption: (txt, options) => options.filter((o) => o.text.toLowerCase().includes(txt.toLowerCase()))
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
