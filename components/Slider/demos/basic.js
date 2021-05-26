define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Slider',
        value: 55,
        showTip: (value) => `${value}米`,
      }
    },
  }
})
