define([], function () {
  return {
    title: '自定义字符',
    file: 'character',
    description:
      '可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。可以传递函数，参数为({index})',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          { component: 'Rate', allowHalf: true, character: 'A', value: 2 },
          { component: 'Rate', allowHalf: true, character: '好', value: 3 },
          { component: 'Rate', allowHalf: true, character: ({ index }) => index + 1 },
          {
            component: 'Rate',
            allowHalf: true,
            value: 2.5,
            character: () => {
              return {
                component: 'Icon',
                type: 'user',
                attrs: {
                  style: {
                    'font-size': '80%',
                  },
                },
              }
            },
          },
        ],
      }
    },
  }
})
