define([], function () {
  return {
    title: '触发事件',
    description: '触发focus、blur事件',
    file: 'events',
    demo: function () {
      let myTextArea = null

      return {
        children: [
          {
            component: 'MultilineTextbox',
            value: '大文本',
            ref: (c) => {
              myTextArea = c
            },
            autoSize: { minRows: 2, maxRows: 6 },
          },
          {
            component: 'Cols',
            styles: {
              padding: '1',
            },
            items: [
              {
                component: 'Button',
                text: '获得焦点',
                onClick: () => {
                  myTextArea.focus()
                },
              },
              {
                component: 'Button',
                text: '焦点离开',
                onClick: () => {
                  myTextArea.blur()
                },
              },
            ],
          },
        ],
      }
    },
  }
})
