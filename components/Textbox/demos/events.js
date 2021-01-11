define([], function () {
  return {
    title: '触发事件',
    description: '触发focus、blur事件',
    file: 'events',
    demo: function () {
      return {
        children: [
          {
            component: 'Textbox',
            ref: 'myTextBox',
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
                events: {
                  click: () => {
                    this.refs.myTextBox.focus()
                  },
                },
              },
              {
                component: 'Button',
                text: '焦点离开',
                events: {
                  click: () => {
                    this.refs.myTextBox.blur()
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
