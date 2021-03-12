define([], function () {
  return {
    title: '带搜索的Select',
    file: 'search',
    demo: function () {
      let select = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'Select',
            showSearch: true,
            value: 6,
            ref: (c) => {
              select = c
            },
            options: [
              { text: '项目1', value: 1 },
              { text: '项目11', value: 2 },
              { text: '项目111', value: 3 },
              { text: '项目1111', value: 4 },
              { text: '项目11111', value: 5 },
              { text: '项目111111', value: 6 },
              { text: '项目1111111', value: 7 },
              { text: '项目11111111', value: 8 },
              { text: '项目111111111', value: 9 },
              { text: '项目1111111112', value: 10 },
            ],
            onSearch(text) {
              // eslint-disable-next-line
              console.log(text)
            },
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
