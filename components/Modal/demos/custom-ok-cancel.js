define([], function () {
  return {
    title: '自定义确定，取消按钮',
    file: 'custom-ok-cancel',
    demo: function () {
      let okButtonRef = null
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Button',
            text: '自定义确定，取消按钮的文本',
            onClick: function () {
              new nomui.Modal({
                content: {
                  header: {
                    caption: {
                      title: '自定义确定，取消按钮的文本',
                    },
                  },
                  body: {
                    children: '请问您需要再来一杯二锅头吗？',
                  },
                },
                okText: '是的，再来一杯',
                cancelText: '不，再来三杯',
              })
            },
          },
          {
            component: 'Button',
            text: '不显示确定按钮',
            onClick: function () {
              new nomui.Modal({
                content: {
                  header: {
                    caption: {
                      title: '不显示确定按钮',
                    },
                  },
                  body: {
                    children: '请问您需要来一杯二锅头吗？',
                  },
                  okButton: false,
                },
                cancelText: '没得选，来不了',
              })
            },
          },
          {
            component: 'Button',
            text: '动态操作确定按钮',
            onClick: function () {
              new nomui.Modal({
                content: {
                  header: {
                    caption: {
                      title: '动态操作确定按钮',
                    },
                  },
                  body: {
                    children: {
                      component: 'Textbox',
                      placeholder: '文本框不为空，确定按钮才启用',
                      onValueChange: ({ newValue }) => {
                        newValue !== null ? okButtonRef.enable() : okButtonRef.disable()
                      },
                    },
                  },
                },
                okButton: {
                  ref: (c) => {
                    okButtonRef = c
                  },
                  disabled: true,
                },
              })
            },
          },
        ],
      }
    },
  }
})
