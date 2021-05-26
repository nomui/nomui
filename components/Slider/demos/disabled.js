define([], function () {
  return {
    title: '禁用',
    file: 'disabled',
    demo: function () {
      return {
        component: 'Slider',
        disable: true,
        value: 55,
        showTip: false,
      }
    },
  }
})
