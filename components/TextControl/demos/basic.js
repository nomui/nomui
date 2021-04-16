define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'TextControl',
          value: '我是纯文本',
        },
      }
    },
  }
})
