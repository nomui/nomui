define([], function () {
  return {
    title: '自定义事件',
    file: 'customize-action',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          extraAction: [
            {
              text: '详情',
              action: function (file) {
                new nomui.Modal({
                  content: {
                    component: 'Panel',
                    header: {
                      caption: {
                        title: '文件信息',
                      },
                    },
                    body: {
                      _config() {
                        const { name, type, uploadTime, lastModified, size, status } = file
                        const u = new Date(uploadTime)
                        const l = new Date(lastModified)
                        this.setProps({
                          children: {
                            component: 'Rows',
                            items: [
                              {
                                component: 'Cols',
                                items: [
                                  {
                                    children: '文件名:',
                                  },
                                  {
                                    children: name,
                                  },
                                ],
                              },
                              {
                                component: 'Cols',
                                items: [
                                  {
                                    children: '文件类型:',
                                  },
                                  {
                                    children: type,
                                  },
                                ],
                              },
                              {
                                component: 'Cols',
                                items: [
                                  {
                                    children: '文件上传日期:',
                                  },
                                  {
                                    children: `${u.getFullYear()}-${u.getMonth() + 1
                                      }-${u.getDate()}`,
                                  },
                                ],
                              },
                              {
                                component: 'Cols',
                                items: [
                                  {
                                    children: '文件最后修改日期:',
                                  },
                                  {
                                    children: `${l.getFullYear()}-${l.getMonth() + 1
                                      }-${l.getDate()}`,
                                  },
                                ],
                              },
                              {
                                component: 'Cols',
                                items: [
                                  {
                                    children: '文件大小:',
                                  },
                                  {
                                    children: `${size} byte`,
                                  },
                                ],
                              },
                              {
                                component: 'Cols',
                                items: [
                                  {
                                    children: '文件上传状态:',
                                  },
                                  {
                                    children: status,
                                  },
                                ],
                              },
                            ],
                          },
                        })
                      },
                    },
                    footer: {
                      _config: function () {
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
              },
            },
          ],
        },
      }
    },
  }
})
