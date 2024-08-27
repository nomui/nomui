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
                component: 'NumberInput',
                name: '2',
                stringMode: true,
                label: '字符串模式',
              },
              {
                component: 'NumberInput',
                name: '3',
                onValueChange: (args) => {
                  console.log(args)
                },
                formatter: (value) => {
                  return `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                },
                parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
                label: '字符串模式',
              },
              {
                component: 'Field',
                label: '',
                control: {
                  component: 'Cols',
                  items: [
                    {
                      component: 'Button',
                      text: '校验',
                      type: 'Primary',
                      onClick: function () {
                        group.validate()
                      },
                    },
                    {
                      component: 'Button',
                      text: '取值',
                      onClick: function () {
                        console.log(group.getValue())
                      },
                    },
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
