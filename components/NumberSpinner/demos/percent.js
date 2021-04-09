define([], function () {
  return {
    title: '百分比微调器',
    file: 'percent',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'NumberSpinner',
            label: '百分比微调器',
            style: 'percent',
            value: 1.1,
          },
          {
            component: 'NumberSpinner',
            label: '百分比微调器',
            precision: 2,
            style: 'percent',
            value: 1,
            step: 0.5,
          },
        ],
      }
    },
  }
})
