define([], function () {
  return {
    title: '自定义操作',
    file: 'action-items.js',
    description: '通过 action prop 来配置自定义的操作',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: '自定义操作',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  title: 'hello',
                  _config: function () {  // 在 _config 里 setProps，这样好拿到组件自身的引用，供后续事件回调函数使用
                    const alertInst = this

                    this.setProps({
                      action: [
                        {
                          component: 'Checkbox',
                          text: '不再显示',
                        },
                        {
                          component: 'Button',
                          text: '确定',
                          onClick: () => {
                            alert('好的')
                            alertInst.close()
                          }
                        }
                      ]
                    })
                  }
                })
              },
            },
          },
          {
            component: 'Button',
            text: '更复杂点的自定义操作',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  title: 'hello',
                  _config: function () {  // 在 _config 里 setProps，这样好拿到组件自身的引用，供后续事件回调函数使用
                    const alertInst = this

                    this.setProps({
                      action: {
                        justify: 'between',
                        items: [
                          {
                            component: 'Checkbox',
                            text: '不再显示',
                          },
                          {
                            component: 'Button',
                            text: '确定',
                            onClick: () => {
                              alert('好的')
                              alertInst.close()
                            }
                          }
                        ]
                      }
                    })
                  }
                })
              },
            },
          },
        ],
      }
    },
  }
})
