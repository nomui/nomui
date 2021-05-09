define([], function () {
  return {
    title: '带时间',
    file: 'with-time',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          placeholder: '带时间',
          showTime: {
            format: 'HH:mm:ss',
            // minTime: '08:08:08',
            // maxTime: '20:20:20',
          },
          format: 'yyyy-MM-dd HH:mm:ss',
          // value: '2021-05-05 11:15:00',
        },
      }
    },
  }
})
