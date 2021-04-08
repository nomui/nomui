define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'PartialDatePicker',
            value: '2010',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择季度',
            mode: 'quarter',
            value: '2010 1季度',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择月',
            mode: 'month',
            // value: '2020-10',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择周',
            mode: 'week',
            value: '2020 32周',
          },
        ],
      }
    },
  }
})
