define([], function () {
  return {
    title: '指定不同位置',
    file: 'with-align',
    demo: function () {
      function getButton(align) {
        return {
          component: 'Button',
          text: align,
          attrs: {
            style: {
              width: '100px',
            },
          },
          onClick: (arg) => {
            const sender = arg.sender
            if (!sender[align]) {
              nomui.Notification.open({
                align: align,
                title: '收款提醒',
                description: '收到用户付款100000万元',
              })
            }
          },
        }
      }

      return {
        children: [
          {
            attrs: {
              style: {
                marginLeft: '100px',
              },
            },
            children: [getButton('topLeft'), getButton('topRight')],
          },

          {
            attrs: {
              style: {
                marginLeft: '100px',
              },
            },
            children: [getButton('bottomLeft'), getButton('bottomRight')],
          },
        ],
      }
    },
  }
})
