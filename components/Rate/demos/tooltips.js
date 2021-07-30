define([], function () {
  return {
    title: '文案展现',
    file: 'tooltips',
    description: '给评分组件加上文案展示。',
    demo: function () {
      const tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful']

      return {
        component: 'Rate',
        value: 2,
        tooltips: tooltips,
      }
    },
  }
})
