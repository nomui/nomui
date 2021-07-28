define([], function () {
  return {
    title: 'disabled',
    description: '只读，无法进行鼠标交互。',
    file: 'basic',
    demo: function () {
      return {
        component: 'Rate',
        disabled: true,
        value: 3,
      }
    },
  }
})
