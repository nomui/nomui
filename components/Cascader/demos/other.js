define(['./data.js'], function (options) {
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
            // eslint-disable-next-line
            console.log(group.getValue())
          },
        },
      ],
    },
  }

  const customizeField = [
    {
      span: 6,
      component: 'Cascader',
      name: 'treatment',
      options,
      value: ['其他'],
      fieldsMapping: {
        key: 'Id',
        label: 'Name',
        value: 'Name',
        children: 'Childs',
      },
      onValueChange({ newValue }) {
        if (newValue && newValue[0] !== '其他') {
          group.update({
            fields: [
              {
                component: 'Cascader',
                label: '治疗领域',
                name: 'treatment',
                options,
                fieldsMapping: {
                  key: 'Id',
                  label: 'Name',
                  value: 'Name',
                  children: 'Childs',
                },
                onValueChange({ newValue: newVal }) {
                  if (newVal[0] !== '其他') {
                    group.update({
                      fields: [
                        {
                          component: 'Cascader',
                          label: '治疗领域',
                          name: 'treatment',
                          options,
                          fieldsMapping: {
                            key: 'Id',
                            label: 'Name',
                            value: 'Name',
                            children: 'Childs',
                          },
                          onValueChange({ newValue: v }) {
                            if (v[0] === '其他') {
                              group.update({ fields: [...customizeField, valueBtn] })
                            }
                          },
                        },
                        valueBtn,
                      ],
                    })
                    group.setValue({ treatment: ['其他'] })
                  }
                },
              },
              valueBtn,
            ],
          })
        }
      },
    },
    {
      span: 6,
      component: 'Textbox',
      placeholder: '请输入自定义治疗领域类型',
      name: 'treatmentSuffix',
    },
  ]

  const selectField = {
    component: 'Cascader',
    label: '治疗领域',
    name: 'treatment',
    options,
    fieldsMapping: {
      key: 'Id',
      label: 'Name',
      value: 'Name',
      children: 'Childs',
    },
    onValueChange({ newValue }) {
      if (newValue[0] === '其他') {
        group.update({ fields: [...customizeField, valueBtn] })
        // group.setValue({ treatment: ['其他'], treatment: null })
      }
    },
  }

  return {
    title: '其他',
    file: 'basic',
    demo: function () {
      return {
        component: 'Form',
        ref: (c) => {
          group = c
        },
        value: {
          treatment: ['抗感染', '丙型肝炎'],
        },
        fields: [selectField, valueBtn],
      }
    },
  }
})
