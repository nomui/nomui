define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let group = null
      return {
        component: 'Form',
        ref: (c) => {
          group = c
        },
        onValueChange: (args) => {
          console.log(args)
        },
        fields: [
          {
            component: 'IconPicker',
            name: 'ip',
            label: '图标选择器',
          },
          {
            component: 'IconPicker',
            name: 'ip1',
            value: 'star',
            searchable: true,
            label: '带搜索框',
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
                  text: '提交',
                  onClick: () => {
                    group.validate()
                    console.log(group.getValue())
                  },
                },
                {
                  component: 'Button',
                  text: '赋值',
                  onClick: () => {
                    group.setValue({
                      ip: 'times',
                      ip2: 'upload'
                    })
                  },
                },
                {
                  component: 'Button',
                  text: '清除',
                  onClick: () => {
                    group.clear()
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
