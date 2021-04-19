define([], function () {
  return {
    title: '自定义',
    file: 'customize',
    demo: function () {
      return {
        component: 'NumberSpinner',
        label: '自定义',
        placeholder: '请输入',
        formatter: (value) => `${value}￥`,
        parser: (value) => (value ? value.replace(/[^d]$/, '') : null),
        min: -100,
        max: 100,
        value: 0,
      }
    },
  }
})
