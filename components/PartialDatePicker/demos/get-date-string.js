define([], function () {
  return {
    title: '获取值对应的日期',
    file: 'get-date-string',
    demo: function () {
      let picker = null
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'PartialDatePicker',
            placeholder: '选择周',
            mode: 'week',
            value: '2020 32周',
            ref: (c) => {
              picker = c
            },
          },
          {
            component: 'Button',
            text: '获取日期',
            onClick: () => {
              // eslint-disable-next-line
              console.log(picker.getDateString('yyyy-MM-dd'))
            },
          },
        ],
      }
    },
  }
})
