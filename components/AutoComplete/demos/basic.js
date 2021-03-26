define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let autoComplete = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'AutoComplete',
            ref: (c) => {
              autoComplete = c
            },
            value: 'aaaaaaaaaa',
            label: '标签',
            onSearch(txt) {
              console.log(`search:${txt}`)
            },
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: '获取值',
                onClick: () => {
                  new nomui.Message({
                    content: `当前值为:${autoComplete.getValue()}`,
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
