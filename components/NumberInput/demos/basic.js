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
            fields: [
              {
                component: 'NumberInput',
                name: '1',
                label: '基础',
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
