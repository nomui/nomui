define([], function () {
  return {
    title: '默认已上传列表',
    file: 'defaultFileList',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          button: false,
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          defaultFileList: [
            {
              uuid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uuid: '-2',
              name: 'redis-6.0.9.tar.gz',
              status: 'done',
              url: 'https://download.redis.io/releases/redis-6.0.9.tar.gz',
            },
          ],
        },
      }
    },
  }
})
