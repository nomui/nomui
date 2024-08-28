define([], function () {
  return {
    title: '带小数',
    file: 'precision',
    description: '注意，在带小数点时取值强制转为字符串模式',
    demo: function () {
      let group = null

      return {
        component: 'Flex',
        rows: [
          {
            component: 'Group',
            ref: (c) => {
              group = c
            },
            fields: [
              {
                component: 'NumberInput',
                name: '1',
                label: '带小数',
                precision: 2,
                stringMode: true
              },

              {
                component: 'Field',
                label: '',
                control: {
                  component: 'Cols',
                  items: [
                    {
                      component: 'Button',
                      text: '取值',
                      onClick: function () {
                        console.log(group.getValue())
                      },
                    },
                    {
                      component: 'Button',
                      text: '赋值',
                      onClick: function () {
                        group.setValue({
                          1: 213,
                          2: 2312321,
                          3: 2134,
                          4: 123
                        })
                      },
                    }
                  ],
                },
              },
            ],
          },
        ],
      }

    },
  }
})
