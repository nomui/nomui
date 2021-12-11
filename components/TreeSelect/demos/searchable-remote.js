define([], function () {
  return {
    title: '可搜索，异步数据',
    file: 'searchable-remote',
    demo: function () {
      let treeSelectRef = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'TreeSelect',
            ref: (c) => {
              treeSelectRef = c
            },
            searchable: {
              placeholder: '输入的值将作为filter的参数',
              filter: ({ inputValue }) => {
                return new Promise(function (resolve) {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(function () {
                    const options = [
                      {
                        text: `一级-1-${inputValue}`,
                        value: '0-0',
                        children: [
                          {
                            text: `二级-1-${inputValue}`,
                            value: '0-0-1',
                          },
                          {
                            text: `二级-2-${inputValue}`,
                            value: '0-0-2',
                            children: [
                              {
                                text: `三级-1-${inputValue}`,
                                value: '0-0-0-1',
                                children: [
                                  {
                                    text: `四级-1-${inputValue}`,
                                    value: '0-0-0-0-1',
                                  },
                                  {
                                    text: `四级-2-${inputValue}`,
                                    value: '0-0-0-0-2',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: `一级-2-${inputValue}`,
                        value: '0-1',
                      },
                    ]
                    resolve(options)
                  }, 300)
                })
              },
            },
            onValueChange(changed) {
              // eslint-disable-next-line
              console.log(changed)
            },
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: 'Get Value',
                onClick: () => {
                  // eslint-disable-next-line
                  console.log(treeSelectRef.getValue())
                },
              },
              {
                component: 'Button',
                text: 'Set value',
                onClick() {
                  treeSelectRef.setValue('0-1')
                },
              },
            ],
          },
        ],
      }
    },
  }
})
