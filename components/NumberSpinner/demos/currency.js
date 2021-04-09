define([], function () {
  return {
    title: '货币微调器',
    file: 'currency',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'NumberSpinner',
            label: '人民币',
            style: 'currency',
            value: 1.1,
          },
          {
            component: 'NumberSpinner',
            label: '美金',
            precision: 2,
            style: 'currency',
            currency: 'USD',
            value: 1,
            step: 0.5,
          },
          {
            component: 'NumberSpinner',
            label: '欧元',
            precision: 2,
            style: 'currency',
            currency: 'EUR',
            value: 1,
            step: 0.5,
          },
        ],
      }
    },
  }
})
