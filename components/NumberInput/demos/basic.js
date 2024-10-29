define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
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
            onValueChange: (args) => {
              console.log(args)
            },
            fields: [
              {
                component: 'NumberInput',
                name: 'age',
                label: '基础',
                onValueChange: (args) => {
                  console.log('x', args)
                },
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
                          'age': 213,
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
