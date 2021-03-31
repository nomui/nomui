define([], function () {
  return {
    title: '带时间',
    file: 'with-time',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          placeholder: '带时间',
          showTime: true,
        },
      }
    },
  }
})
