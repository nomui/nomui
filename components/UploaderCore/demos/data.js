define([], function () {
  return {
    title: '额外参数',
    file: 'data',
    demo: function () {
      return {
        component: 'Flex',
        align: 'center',
        gutter: 'large',
        rows: [
          {
            component: 'UploaderCore',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: window.btoa('wetrial'),
            },
            data: { userType: '1' },
            button: {
              component: 'Button',
              text: '点我上传',
            },
          },
        ],
      }
    },
  }
})
