define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Rate',
        value: 3.3,
        onValueChange(args) {
          // eslint-disable-next-line
          console.log(args)
        },
      }
    },
  }
})
