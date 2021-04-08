define([], function () {
  return {
    title: '基础用法',
    file: 'get-date-string',
    demo: function () {
      let picker = null
      return {
        component: 'Cols',
        items: [
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
              console.log(picker.getDateString('yyyy-MM-dd'))
            },
          },
        ],
      }
    },
  }
})
