define([], function () {
  return {
    title: '自定义字符',
    file: 'character',
    description:
      '可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。可以传递函数，参数为({index})',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          { component: 'Rate', character: 'A', value: 2, allowHalf: true },
          { component: 'Rate', character: '好', value: 3, allowHalf: true },
          { component: 'Rate', character: ({ index }) => index + 1 },
        ],
      }
    },
  }
})
