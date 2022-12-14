define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'PartialDatePicker',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择季度',
            format: '$year年 第$quarter季度',
            mode: 'quarter',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择月',
            mode: 'month',
          },
          {
            component: 'PartialDatePicker',
            placeholder: '选择周',
            mode: 'week',
          },
        ],
      }
    },

    description:
      '最基础的用法，在浮层中可以选择日期。',
  }
})
