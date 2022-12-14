define([], function () {
  return {
    title: 'List中使用',
    file: 'list',
    demo: function () {
      return {
        component: 'List',
        cols: 2,
        items: [
          {
            component: 'Statistic',
            title: 'Active User',
            value: '112893.23',
            precision: 2,
          },
          {
            component: 'Statistic',
            title: 'Account Balance (CNY)',
            value: '112893,73',
            precision: 1,
          },
        ],
      }
    },
    description:
      '在List组件中使用统计数值',
  }
})
