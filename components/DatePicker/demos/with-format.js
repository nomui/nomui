define([], function () {
  return {
    title: '指定日期格式',
    file: 'with-format.js',
    description: '指定格式为dd/MM/yyyy',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          format: 'dd/MM/yyyy',
        },
      }
    },
  }
})
