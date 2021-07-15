define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Button',

        text: '鼠标放上面会出来文字提示',
        tooltip: '我是文字提示',
      }
    },
  }
})
