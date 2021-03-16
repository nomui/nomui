define([], function () {
  return {
    title: '异步加载',
    file: 'async',
    demo: function () {
      return {
        component: 'Uploader',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // eslint-disable-next-line
        renderer: (file) => {
          return {
            component: 'Icon',
            type: 'default',
          }
        },
        onRemove: {
          action: (e, file) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                // eslint-disable-next-line
                console.log(e, file)
                resolve(true)
              }, 3000)
            })
          },
        },
        extraAction: [
          {
            text: '其他操作',
            action: (e, file) => {
              // eslint-disable-next-line
              console.log(e, file)
            },
          },
        ],
        defaultFileList: new Promise((resolve) => {
          setInterval(() => {
            resolve([
              {
                uuid: '-1',
                name: 'image.png',
                status: 'done',
                size: 1111,
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uuid: '-2',
                name: 'image.png',
                status: 'done',
                size: 2222,
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
            ])
          }, 3000)
        }),
      }
    },
  }
})
