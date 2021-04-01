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

            sender[align].show()
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
            children: [getButton('top left'), getButton('top'), getButton('top right')],
          },
          {
            attrs: {
              style: {
                width: '100px',
                float: 'left',
              },
            },
            children: [getButton('left top'), getButton('left'), getButton('left bottom')],
          },
          {
            attrs: {
              style: {
                width: '100px',
                marginLeft: '400px',
              },
            },
            children: [getButton('right top'), getButton('right'), getButton('right bottom')],
          },
          {
            attrs: {
              style: {
                marginLeft: '100px',
              },
            },
            children: [getButton('bottom left'), getButton('bottom'), getButton('bottom right')],
          },
        ],
      }
    },
  }
})
