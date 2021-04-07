define([], function () {
  return {
    title: '禁用部分日期',
    file: 'disabledTime',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          disabledTime: function (date) {
            if (new Date(date).format('yyyy-MM-dd') === '2021-04-15') {
              return true
            }
            return false
          },
          minDate: '2021-04-01',
          maxDate: '2021-04-20',
          placeholder: 'basic usage',
        },
      }
    },
  }
})
