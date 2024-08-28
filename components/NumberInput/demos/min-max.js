define([], function () {
  return {
    title: '最大最小值',
    file: 'min-max',
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
                name: '5',
                min: 1,
                max: 100,
                label: '最大值最小值',
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
