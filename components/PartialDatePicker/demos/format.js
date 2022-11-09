define([], function () {
  return {
    title: '自定格式',
    file: 'format',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'PartialDatePicker',
            placeholder: '选择季度',
            format: '$year年 第$quarter季度',
            mode: 'quarter',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择月',
            format: 'yyyy/MM',
            mode: 'month',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择周',
            format: '$year年 第$week周',
            mode: 'week',
          },
        ],
      }
    },
  }
})
