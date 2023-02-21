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
            type: 'file',
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
            text: ({ name }) => name,
            action: (e) => {
              // eslint-disable-next-line
              console.log(e)
            },
          },
          {
            text: ({ name }) => {
              if (!name.includes('.')) return null
              const suffix = name.substring(name.lastIndexOf('.') + 1)
              switch (suffix) {
                case 'txt':
                  return '文本文件'
                case 'png':
                  return '带水印文件'
                default:
                  return '其他文件'
              }
            },
            action: ({ file }) => {
              if (file.name.endsWith('.png'))
                // eslint-disable-next-line
                console.log('下载水印文件: ', file)
            },
          },
        ],
        defaultFileList: new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                uuid: '-1',
                name: 'text.txt',
                status: 'done',
                size: 1111,
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uuid: '-2',
                name: 'withPrintFile.png',
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
