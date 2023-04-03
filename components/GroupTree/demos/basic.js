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
            onNodeDeleted: (args) => {
              console.log(args)
            },
            value: data,
            columns: [
              {
                component: 'Textbox',
                field: '姓名',
                name: 'name',
              },
              {
                component: 'Select',
                field: '年级',
                name: 'grade',
              },
              {
                component: 'Textbox',
                field: '年龄',
                name: 'age',
                // 校验规则
                rules: [{ type: 'number', message: '请输入有效的数字' }],
              },
              {
                component: 'MultilineTextbox',
                rows: 1,
                field: '备注',
                name: 'info',
                width: 300,
              },
              {
                // 自定义渲染列内容
                name: 'custom',
                field: '自定义',
                width: 100,
                render: (params) => {
                  return { component: 'Avatar', text: params.nodeData.text }
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
            ],
          },
        ],
      }
    },
  }
})
