define([], function () {
  return {
    title: '限制上传格式',
    file: 'accept',
    demo: function () {
      return {
        component: 'Flex',
        align: 'center',
        gutter: 'large',
        rows: [
          {
            component: 'UploaderCore',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            accept: 'image/*',
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
