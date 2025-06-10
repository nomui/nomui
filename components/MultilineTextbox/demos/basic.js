define([], function () {
  return {
    title: '基础用法',
    description: '默认的textarea',
    file: 'basic',
    demo: function () {
      return {
        component: 'MultilineTextbox',
        value: '多行文本',
        onValueChange: (e) => {
          // eslint-disable-next-line
          console.log(e.newValue)
        },
        onBlur: (args) => {
          // eslint-disable-next-line
          console.log(args.value)
        },
        onEnter: (args) => {
          // eslint-disable-next-line
          console.log(args.value)
        },
      }
    },
  }
})
