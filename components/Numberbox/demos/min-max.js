define([], function () {
  return {
    title: '带最大、最小值',
    file: 'min-max',
    description: '只允许输入 1 - 20之间的值',
    demo: function () {
      return {
        children: [
          {
            component: 'Numberbox',
            value: 10,
            min: 1,
            max: 20,
          },
        ],
      }
    },
  }
})
