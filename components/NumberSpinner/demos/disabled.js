define([], function () {
  return {
    title: '禁用',
    file: 'disabled',
    demo: function () {
      return {
        component: 'NumberSpinner',
        disabled: true,
        label: '禁用状态',
        placeholder: '请输入',
        value: 100,
      }
    },
  }
})
