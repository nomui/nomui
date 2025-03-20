define([], function () {
  return {
    title: '周选择模式',
    file: 'week-mode',
    description:
      '周选择模式下，界面上显示的是以周为单位，但取值的日期为当周的第一天。周模式下getValue({asObject:true})可以获取更详细的对象值。',
    demo: function () {
      let dateRef = null,
        dateRef1 = null
      return {
        children: {
          component: 'Flex',
          rows: [
            {
              component: 'DatePicker',
              ref: (c) => {
                dateRef1 = c
              },
              label: '取值仍是日期',
              placeholder: 'choose a week',
              weekMode: true,
              value: '2025-03-03',
              onValueChange: (args) => {
                console.log(args)
              },
            },

            {
              component: 'DatePicker',
              ref: (c) => {
                dateRef1 = c
              },
              label: '带日期范围',
              placeholder: 'choose a week',
              weekMode: {
                showDateRange: true,
              },
              value: '2025-03-03',
              onValueChange: (args) => {
                console.log(args)
              },
            },

            {
              component: 'StaticText',
              label: '',
              value:
                '注意，配置valueOptions:{asObject:true}时，取值是一个包含了年，周，当周日期数组的对象，原则上赋值也应该是相同格式的对象。',
            },
            {
              component: 'DatePicker',
              label: '取值为对象',
              placeholder: 'choose a week',
              weekMode: true,
              valueOptions: {
                asObject: true, // 以对象形式取值以及赋值
              },
              value: {
                year: 2025,
                week: 12,
                dates: [
                  '2025-03-17',
                  '2025-03-18',
                  '2025-03-19',
                  '2025-03-20',
                  '2025-03-21',
                  '2025-03-22',
                  '2025-03-23',
                ],
              },
              ref: (c) => {
                dateRef = c
              },
              onValueChange: (args) => {
                console.log(args)
              },
            },
            {
              justify: 'center',
              gutter: 'medium',
              cols: [
                {
                  component: 'Button',
                  text: '取第一个字段的值',
                  onClick: () => {
                    console.log(dateRef1.getValue())
                  },
                },
                {
                  component: 'Button',
                  text: '获取周详情',
                  onClick: () => {
                    console.log(dateRef.getWeekDetails())
                  },
                },
                {
                  component: 'Button',
                  text: '赋值',
                  onClick: () => {
                    console.log(dateRef.setValue('2024-12-12'))
                  },
                },
                {
                  component: 'Button',
                  text: '取对象值',
                  onClick: () => {
                    console.log(dateRef.getValue())
                  },
                },
              ],
            },
          ],
        },
      }
    },
  }
})
