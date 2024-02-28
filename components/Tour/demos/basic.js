define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '',
    demo: function () {
      const refs = {}
      const steps = [
        {
          title: '第一步',
          description: '先点这里',
          target: () => { return refs.step1 }
        }
      ]

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            cols: [
              {
                component: 'Button',
                ref: (c) => {
                  refs.step1 = c
                },
                attrs: {
                  id: 'step1'
                },
                text: '第一步'
              },
              {
                grow: true,
                children: {
                  component: 'Button',
                  ref: (c) => {
                    refs.step2 = c
                  },
                  text: '第二步'
                },
              },
              {
                component: 'Button',
                ref: (c) => {
                  refs.step3 = c
                },
                text: '第三步'
              },

            ]
          },
          {
            component: 'Button',
            text: '查看指引',
            type: 'primary',
            onClick: () => {
              new nomui.Tour({
                steps: steps
              })
            }
          }
        ]

      }
    },
  }
})
