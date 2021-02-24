define([], function () {
  return {
    title: '禁用状态',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Checkbox',
            text: '同意',
            disabled: true,
          },
        ],
      }
    },
  }
})
