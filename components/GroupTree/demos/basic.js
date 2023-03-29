define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      const data = [
        {
          text: '节点 1',
          school: '中南大学',
          name: '张三',
          age: 23,
          info: '这个人不喜欢运动',

          children: [
            {
              text: '节点 1.1',
              children: [{ text: '节点 1.1.1' }, { text: '节点 1.1.2' }, { text: '节点 1.1.3' }],
            },
          ],
        },
        {
          text: '节点 2',
          children: [{ text: '节点 2.1', children: [] }, { text: '节点 2.2' }],
        },
        {
          text: '节点 3',
          children: [{ text: '节点 3.1' }, { text: '节点 3.2' }],
        },
      ]

      return {
        component: 'Form',
        fields: [
          {
            component: 'GroupTree',
            label: '多级字段组',
            value: data,
            columns: [
              {
                component: 'Textbox',
                name: 'name',
              },
              {
                component: 'Select',
                name: 'grade',
              },
              {
                component: 'Textbox',
                name: 'age',
              },
              {
                component: 'MultilineTextbox',
                name: 'info',
                width: 300,
              },
              {
                name: 'custom',
                render: (params) => {
                  return { component: 'Avatar', text: params.nodeData.text }
                },
              },
            ],
          },
        ],
      }
    },
  }
})
