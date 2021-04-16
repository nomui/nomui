define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'NumberSpinner',
        label: '数字微调器',
        placeholder: '请输入',
        value: 100,
      }
    },
  }
})
