define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      let formRef = null
      const data = [
        {
          text: '节点 1',
          key: '1',
          school: '中南大学',
          name: '张三',
          age: 23,
          info: '这个人不喜欢运动',

          children: [
            {
              text: '节点 1.1',
              key: '1.1',
              children: [
                { text: '节点 1.1.1', key: '1.1.1' },
                { text: '节点 1.1.2', key: '1.1.2' },
                { text: '节点 1.1.3', key: '1.1.3' },
              ],
            },
          ],
        },
        {
          text: '节点 2',
          key: '2',
          children: [
            { text: '节点 2.1', key: '2.1', children: [] },
            { text: '节点 2.2', key: '2.2' },
          ],
        },
        {
          text: '节点 3',
          key: '3',
          children: [
            { text: '节点 3.1', key: '3.1' },
            { text: '节点 3.2', key: '3.2' },
          ],
        },
      ]

      return {
        component: 'Form',
        ref: (c) => {
          formRef = c
        },

        fields: [
          {
            component: 'GroupTree',
            name: 'grouptree',
            label: '多级字段组',
            columnWidth: 120,
            onNodeDeleted: (args) => {
              console.log('已删除', args)
            },
            onValueChange: ({ newValue }) => {
              console.log('值发生变化', newValue)
            },
            // value: data,
            groupDefaults: {
              fields: [
                {
                  component: 'Textbox',
                  label: '姓名',
                  name: 'name',
                },
                {
                  component: 'Select',
                  label: '年级',
                  name: 'grade',
                },
                {
                  component: 'Textbox',
                  label: '年龄',
                  name: 'age',
                  // 校验规则
                  rules: [{ type: 'number', message: '请输入有效的数字' }],
                },
                {
                  // 自定义渲染列内容
                  name: 'custom',
                  label: '头像',
                  // width: 100,
                  render: (params) => {
                    return {
                      component: 'Flex',
                      cols: [
                        { component: 'Avatar', text: params.nodeData.text },
                        { component: 'Avatar', text: params.nodeData.name },
                      ],
                    }
                  },
                },
                {
                  component: 'MultilineTextbox',
                  rows: 1,
                  label: '备注',
                  name: 'info',
                  width: 300,
                },
              ],
            },
          },
        ],
        controlAction: [
          {
            component: 'Button',
            text: '取值',
            type: 'primary',
            onClick: () => {
              console.log(formRef.getValue())
            },
          },
          {
            component: 'Button',
            text: '校验',
            onClick: () => {
              console.log(formRef.validate())
            },
          },
          {
            component: 'Button',
            text: '赋值',
            onClick: () => {
              formRef.setValue({
                grouptree: data,
              })
            },
          },
        ],
      }
    },
  }
})
