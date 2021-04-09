define([], function () {
  return {
    title: '最小日期',
    file: 'min-date',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'PartialDatePicker',
            minDate: '2010',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择季度',
            mode: 'quarter',
            minDate: '2010 2季度',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择月',
            mode: 'month',
            maxDate: '2020-10',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择周',
            mode: 'week',
            minDate: '2020 12周',
            maxDate: '2025 32周',
          },
        ],
      }
    },
  }
})
