define([], function () {
  return {
    title: '额外工具栏',
    file: 'extra',
    demo: function () {
      let dpref = null
      return {
        children: {
          component: 'Flex',
          cols: [
            {
              component: 'DatePicker',
              placeholder: '额外工具栏',

              showNow: false,
              extraTools: (inst) => {
                return {
                  component: 'Button',
                  size: 'small',
                  text: '至今',
                  onClick: () => {
                    inst.setValue('至今')
                    inst.close()
                  },
                }
              },
            },
            {
              component: 'DatePicker',
              placeholder: '额外工具栏',
              ref: (c) => {
                dpref = c
              },
              showNow: false,
              showTime: {
                format: 'HH:mm:ss',
                // minTime: '08:08:08',
                // maxTime: '20:20:20',
              },
              format: 'yyyy-MM-dd HH:mm:ss',
              value: '2021-05-05 11:15:00',
              allowInValid: true,
              extraTools: [
                {
                  component: 'Button',
                  size: 'small',
                  text: '至今',
                  onClick: () => {
                    dpref.setValue('至今')
                    dpref.close()
                  },
                },
                {
                  component: 'Button',
                  size: 'small',
                  text: '圣诞节',
                  onClick: () => {
                    dpref.setValue('2022-12-25')
                    dpref.close()
                  },
                },
                {
                  component: 'Button',
                  size: 'small',
                  text: 'NA',
                  onClick: () => {
                    dpref.setValue('NA')
                    dpref.close()
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
