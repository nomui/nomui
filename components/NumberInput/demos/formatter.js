define([], function () {
  return {
    title: '自定义格式',
    file: 'formatter',
    description:
      'formatter与parser必须同时配置，分别控制显示值与真实值的转换，注意在自定义格式时取值强制转为字符串模式',
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
                name: '4',
                onValueChange: (args) => {
                  console.log(args)
                },
                value: 12345,
                formatter: (value) => {
                  return `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                },
                parser: (value) => {
                  let result = value.replace(/[^0-9.-]/g, '')

                  if (result.indexOf('.') !== -1) {
                    const integerPart = result.substring(0, result.indexOf('.'))
                    let decimalPart = result.substring(result.indexOf('.') + 1)

                    decimalPart = decimalPart.substring(0, 1)

                    result = `${integerPart}.${decimalPart}`
                  }

                  if (result.startsWith('.')) {
                    result = `0${result}`
                  }

                  return result
                },
                label: '自定义格式',
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
                          4: 123,
                        })
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
