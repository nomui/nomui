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
              component: 'PartialDatePicker',
              placeholder: '额外工具栏',

              mode: 'month',
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
              component: 'PartialDatePicker',
              placeholder: '额外工具栏',
              ref: (c) => {
                dpref = c
              },
              showNow: false,
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
                  text: '今年',
                  onClick: () => {
                    dpref.setValue('2022')
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
