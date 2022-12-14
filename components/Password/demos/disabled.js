define([], function () {
  return {
    title: '禁用状态',
    file: 'disabled',
    demo: function () {
      return {
        children: {
          component: 'Password',
          value: 'disabled',
          disabled: true,
        },
      }
    },
    description:
      '密码框设置为禁用，disabled设置为true',
  }
})
