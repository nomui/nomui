define([], function () {
  return {
    title: '禁用状态',
    description: '设置 `disabled` 为 true',
    file: 'disabled',
    demo: function () {
      return {
        component: 'MultilineTextbox',
        value: '多行文本',
        disabled: true,
      }
    },
  }
})
