define([], function () {
  return {
    title: '带icon图片',
    description: '使用icon图片，优先级高于文字',
    file: 'with-icon',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Avatar',
            icon: 'user',
            text: '小马',
          },
        ],
      }
    },
  }
})
