define([], function () {
  return {
    title: '触发事件',
    description: '触发focus、blur事件',
    file: 'events',
    demo: function () {
      let myTextBoxRef
      return {
        children: [
          {
            component: 'Textbox',
            ref: (c) => {
              myTextBoxRef = c
            },
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
                  myTextBoxRef.focus()
                },
              },
              {
                component: 'Button',
                text: '焦点离开',
                onClick: () => {
                  myTextBoxRef.blur()
                },
              },
            ],
          },
        ],
      }
    },
  }
})
