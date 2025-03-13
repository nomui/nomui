define([], function () {
  return {
    title: 'select 模式',
    file: 'model',
    demo: function () {
      let autoCompleteRef = null
      return {
        component: 'Flex',
        rows: [
          {
            component: 'AutoComplete',
            onCreated: ({ inst }) => {
              autoCompleteRef = inst
              window.aaa = inst
            },
            filterName: 'select',
            optionFields: { value: 'age', text: 'name' },
            options: [
              { name: 'a', age: 1 },
              { name: 'A', age: 2 },
              { name: 'aa', age: 11 },
              { name: 'AA', age: 22 },
              { name: 'aaa', age: 111 },
              { name: 'AAA', age: 222 },
              { name: 'aaaa', age: 1111 },
              { name: 'AAAA', age: 2222 },
              { name: 'aaaaa', age: 11111 },
              { name: 'AAAAA', age: 22222 },
            ],
            filterOption: (txt, options) =>
              options.filter((o) => o.name.toLowerCase().includes(txt.toLowerCase())),
          },
          {
            component: 'Flex',
            gutter: 'medium',
            cols: [
              {
                component: 'Button',
                text: 'Get Value',
                onClick: () => {
                  // eslint-disable-next-line
                  console.log('获取value:', autoCompleteRef.getValue())
                  // eslint-disable-next-line
                  console.log('获取当前勾选对象:', autoCompleteRef.getSelectedOption())
                },
              },
              {
                component: 'Button',
                text: 'Set Value',
                onClick: () => {
                  autoCompleteRef.setValue(2222, { triggerChange: true })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
