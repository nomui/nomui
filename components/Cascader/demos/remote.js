define([], function () {
  return {
    title: '异步获取下一级',
    file: 'remote',
    demo: function () {
      let cascader = null

      return {
        component: 'Form',
        fields: [
          {
            component: 'Cascader',
            ref: (c) => {
              cascader = c
            },
            placeholder: '请选择',
            fieldsMapping: {
              key: 'value',
              label: 'text',
              value: 'value',
              children: 'children',
            },
            loadData: ({ level }) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  if (level < 1) {
                    resolve([
                      {
                        value: 'KJLKAF9120301230',
                        text: '999感冒灵颗粒',
                      },
                      {
                        value: 'QQWE89123LKJA',
                        text: '小柴胡颗粒',
                      },
                    ])
                  }
                }, 500)
              })
            },
            options: [
              {
                value: 'PQK9DZSTrQtu4TAvlPWcc',
                text: '广州医科大学附属番禺中心医院',
                isLeaf: false,
              },
              {
                value: 'dEd7SUB1qwLx_pVIjihLW',
                text: '北京市平谷区医院',
                isLeaf: false,
              },
              {
                value: 'SYpXnRzpr4gAq8UEi3qG1',
                text: '厦门弘爱医院',
                isLeaf: false,
              },
            ],
          },

          {
            component: 'Field',
            label: '',
            control: {
              component: 'Cols',
              items: [
                {
                  component: 'Button',
                  type: 'primary',
                  text: '提 交',
                  onClick: () => {
                    cascader.validate()
                    console.log(cascader.getValue())
                  },
                },
                {
                  component: 'Button',
                  text: '重 置',
                  onClick: () => {
                    cascader.reset()
                  },
                },
              ],
            },
          },
        ],
      }
    },
  }
})
