define([], function () {
  return {
    title: '仅叶子节点',
    file: 'leafonly',
    description: '配置onlyleaf时,仅选择叶子节点会触发改变',
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
            onlyleaf: true,
            fieldsMapping: {
              key: 'value',
              label: 'text',
              value: 'value',
              children: 'children',
            },
            value: ['PQK9DZSTrQtu4TAvlPWcc', 'YqNnRlbGksR7pS8Z0ajfi'],
            options: [
              {
                value: 'PQK9DZSTrQtu4TAvlPWcc',
                text: '广州医科大学附属番禺中心医院',
                children: [
                  {
                    value: 'TdtIrbqMsGT2pG-_tSH3D',
                    text: '板蓝根颗粒',
                    children: null,
                    label: '板蓝根颗粒',
                    disabled: false,
                  },
                  {
                    value: 'YqNnRlbGksR7pS8Z0ajfi',
                    text: '999感冒灵颗粒',
                    children: null,
                    label: '999感冒灵颗粒',
                    disabled: false,
                  },
                ],
              },
              {
                value: 'dEd7SUB1qwLx_pVIjihLW',
                text: '北京市平谷区医院',
                children: [
                  {
                    value: 'TdtIrbqMsGT2pG-_tSH3D',
                    text: '板蓝根颗粒',
                    children: null,
                    label: '板蓝根颗粒',
                    disabled: true,
                  },
                ],
              },
              {
                value: 'SYpXnRzpr4gAq8UEi3qG1',
                text: '厦门弘爱医院',
                children: [
                  {
                    value: 'YqNnRlbGksR7pS8Z0ajfi',
                    text: '999感冒灵颗粒',
                    children: null,
                    label: '999感冒灵颗粒',
                    disabled: false,
                  },
                ],
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
