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
            console.log(args)
          },
        },
      }
    },
    description:
      '按入回车键时，触发onEnter回调',

  }
})
