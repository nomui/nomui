define([], function () {
  return {
    title: '周选择模式',
    file: 'week-mode',
    description:
      '周选择模式下，界面上显示的是以周为单位，但取值的日期为当周的第一天，如果传入format则以format作为格式，取值为某年某周（此时该取值不符合合法日期校验规则）。',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          rows: [
            {
              component: 'DatePicker',
              label: '取值仍是日期',
              placeholder: 'choose a week',
              weekMode: true,
              value: '2025-03-14',
              ref: (c) => {
                window.ccc = c
              },
            },
            {
              component: 'DatePicker',
              label: '取值为某年某周',
              ref: (c) => {
                window.ddd = c
              },
              placeholder: 'choose a week',
              weekMode: {
                format: '{year}年{week}周',
              },
              onValueChange: ({ sender }) => {
                console.log(sender.getWeekDetails())
              },
              value: '2025年22周',
            },
          ],
        },
      }
    },
  }
})
