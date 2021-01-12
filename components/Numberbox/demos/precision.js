define([], function () {
  return {
    title: '带小数位数',
    file: 'precision',
    description: '2位精度',
    demo: function () {
      return {
        children: [
          {
            component: 'Numberbox',
            precision: 2,
          },
        ],
      }
    },
  }
})
