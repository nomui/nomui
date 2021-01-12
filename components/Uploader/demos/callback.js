define([], function () {
  return {
    title: '事件回调',
    file: 'callback',
    demo: function () {
      function createModal(name) {
        return new Promise((resolve) => {
          new nomui.Modal({
            content: {
              component: 'Panel',
              header: {
                caption: {
                  title: '确认',
                },
              },
              body: {
                children: [
                  {
                    children: `确认删除文件 ${name}?`,
                  },
                ],
              },
              footer: {
                _config() {
                  const modal = this.$modal
                  this.setProps({
                    children: [
                      {
                        component: 'Button',
                        text: '否',
                        onClick: function () {
                          resolve(false)
                          modal.close()
                        },
                      },
                      {
                        component: 'Button',
                        text: '是',
                        onClick: function () {
                          resolve(true)
                          modal.close()
                        },
                      },
                    ],
                  })
                },
              },
            },
          })
        })
      }
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onRemove: function (file) {
            return createModal(file.name)
          },
          onPreview: function (file) {
            const { originFile, type } = file
            const imgType = /^image\/[A-Za-z*]+/i
            if (!imgType.test(type) || !(originFile instanceof Blob)) return

            function transformBase64() {
              return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                reader.readAsDataURL(originFile)
                reader.onload = function () {
                  resolve(reader.result)
                }
                reader.onerror = function (error) {
                  reject(error)
                }
              })
            }

            transformBase64(file).then((src) => {
              new nomui.Modal({
                content: {
                  component: 'Panel',
                  header: {
                    caption: {
                      title: '文件预览',
                    },
                  },
                  body: {
                    tag: 'img',
                    attrs: {
                      src,
                    },
                  },
                  footer: {
                    _config() {
                      const modal = this.$modal
                      this.setProps({
                        children: {
                          component: 'Button',
                          text: '关闭',
                          onClick: function () {
                            modal.close()
                          },
                        },
                      })
                    },
                  },
                },
              })
            })
          },
        },
      }
    },
  }
})
