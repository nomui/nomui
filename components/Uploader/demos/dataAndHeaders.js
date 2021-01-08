define([], function () {
  return {
    title: '额外参数',
    file: 'dataAndHeaders',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          headers: {
            authorization: window.btoa('123456'),
          },
          data: { oid: '123456789' },
        },
      }
    },
  }
})
