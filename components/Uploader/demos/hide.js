define([], function () {
  return {
    title: '隐藏列表',
    file: 'hide',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          display: false,
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        },
      }
    },
  }
})
