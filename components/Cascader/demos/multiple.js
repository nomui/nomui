define(['./data.js'], function (data) {
  return {
    title: '多选',
    file: 'multiple',
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
            multiple: true,
            placeholder: '请选择',
            fieldsMapping: {
              key: 'Id',
              label: 'Name',
              value: 'Id',
              children: 'Childs',
            },
            onValueChange: () => {
              console.log(cascader.getValue())
            },
            changeOnClose: true, // 浮层关闭的时候才触发 onValueChange
            options: data,
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
