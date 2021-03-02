define(['./data.js'], function (options) {
  return {
    title: '其他',
    file: 'other',
    demo: function () {
      /**
       * 可选可填，当用户选择"其他"(第一层的其他)时，允许用户填入自定义选项
       */
      let group = null

      const valueBtn = {
        component: 'Field',
        label: '',
        control: {
          component: 'Cols',
          items: [
            {
              component: 'Button',
              type: 'primary',
              text: '表单值',
              onClick: () => {
                const data = group.getValue()
                let display = ''
                if (!data) {
                  display = ''
                } else {
                  for (const field in data) {
                    display += `${field} : ${JSON.stringify(data[field])}`
                  }
                }
                new nomui.Alert({
                  title: '当前选中的值',
                  type: 'info',
                  description: display,
                })
              },
            },
          ],
        },
      }

      const cascader = {
        component: 'Cascader',
        name: 'treatment',
        options,
        fieldsMapping: {
          key: 'Id',
          label: 'Name',
          value: 'Name',
          children: 'Childs',
        },
      }

      const selectedFields = [cascader, valueBtn]

      const customizeFields = [
        {
          span: 6,
          ...cascader,
        },
        {
          span: 6,
          component: 'Textbox',
          placeholder: '请输入自定义治疗领域类型',
          name: 'other',
        },
        valueBtn,
      ]
      return {
        component: 'Form',
        ref: (c) => {
          group = c
        },
        value: {
          treatment: ['抗感染', '丙型肝炎'],
        },
        _config() {
          const { fs } = this.props
          if (fs) {
            this.setProps({ fields: fs })
          } else {
            this.setProps({ fields: selectedFields })
          }
        },
        onValueChange({ newValue, oldValue }) {
          const newtreatment = newValue ? newValue.treatment : newValue
          const oldtreatment = oldValue ? oldValue.treatment : oldValue
          if (
            (newtreatment ? newtreatment.toString() : newtreatment) ===
            (oldtreatment ? oldtreatment.toString() : oldtreatment)
          ) {
            return
          }

          // update
          if (!newtreatment || newtreatment[0] !== '其他') {
            group.update({ fs: selectedFields })
          } else {
            group.update({ fs: customizeFields })
          }
        },
      }
    },
  }
})
