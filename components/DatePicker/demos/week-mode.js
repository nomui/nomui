define([], function () {
  return {
    title: '周选择模式',
    file: 'week-mode',
    description:
      '周选择模式下，界面上显示的是以周为单位，但取值的日期为当周的第一天，如果传入format则以format作为格式，取值为某年某周（此时该取值不符合合法日期校验规则）。周模式下getValue({asObject:true})可以获取对象值',
    demo: function () {
      let dateRef = null
      return {
        children: {
          component: 'Flex',
          rows: [
            {
              component: 'DatePicker',
              label: '取值仍是日期',
              placeholder: 'choose a week',
              weekMode: true,
              value: '2025-03-03',
            },
            {
              component: 'DatePicker',
              label: '取值为某年某周',
              placeholder: 'choose a week',
              weekMode: {
                format: '{year}年{week}周',
              },
              value: '2025年22周',
              ref: (c) => {
                dateRef = c
              },
            },
            {
              justify: 'center',
              gutter: 'medium',
              cols: [
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
                    console.log(dateRef.setValue('2024年1周'))
                  },
                },
                {
                  component: 'Button',
                  text: '取对象值',
                  onClick: () => {
                    console.log(dateRef.getValue({ asObject: true }))
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
