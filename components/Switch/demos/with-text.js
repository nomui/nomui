define([], function () {
  return {
    title: '自定义文本',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Switch',
          text: 'switch',
          name: 'x',
          selectedText: 'on',
          unselectedText: 'off',
        },
      }
    },
  }
})
