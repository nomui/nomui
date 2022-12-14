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
    description:
      '当 disabled 为 true 时，滑块处于不可用状态。',

  }
})
