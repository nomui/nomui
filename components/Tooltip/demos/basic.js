define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Button',

            text: '鼠标放上面会出来文字提示',
            tooltip: '我是文字提示',
          },
          {
            component: 'Button',
            text: '传入配置',
            tooltip: {
              attrs: {
                style: {
                  width: '300px',
                },
              },
              align: 'right',
              children:
                '鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示鼠标放上面会出来文字提示',
            },
          },
        ],
      }
    },
  }
})
