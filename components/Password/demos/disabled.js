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
    }
  })
  