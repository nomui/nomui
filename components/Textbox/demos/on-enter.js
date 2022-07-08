define([], function () {
  return {
    title: '回车触发回调',
    file: 'on-enter',
    demo: function () {
      return {
        children: {
          component: 'Textbox',
          placeholder: '回车触发回调',
          onEnter: (args) => {
            // eslint-disable-next-line
            console.log(args)
          },
        },
      }
    },
  }
})
