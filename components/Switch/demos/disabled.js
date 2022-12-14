define([], function () {
  return {
    title: '禁用',
    file: 'disabled',
    demo: function () {
      return {
        component: 'Flex',
        cols: [
          {
            component: 'Switch',
            value: true,
            disabled: true,
          },
          {
            component: 'Switch',
            value: false,
            disabled: true,
          },
        ],
      }
    },
    description:
      '当 disabled 为 true 时，Switch处于不可用状态。',
  }
})
