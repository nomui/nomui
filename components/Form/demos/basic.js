define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '`Form` 继承自 `Group`，因此用法与 `Group` 一致，当前尚未对 `Form` 增加特定的功能，只是语义上代表一个表单。',
    demo: function () {
      return {
        component: 'Form',
        fields: [
          {
            component: 'Textbox', name: 'name', label: '姓名',
          },
          {
            component: 'Numberbox', name: 'age', label: '年龄',
          },
          {
            component: 'Textbox', name: 'email', label: 'Email',
          },
          {
            component: 'RadioList', name: 'gender', label: '性别',
            options: [
              { text: '男', value: 0 },
              { text: '女', value: 1 },
            ],
          },
          {
            component: 'CheckboxList', name: 'hobbies', label: '爱好',
            options: [
              { text: '唱歌', value: 1 },
              { text: '跳舞', value: 2 },
              { text: '旅游', value: 3 },
            ],
          },
        ],
        controlAction: [
          {
            component: 'Button',
            text: '保 存',
            type: 'primary'

          },
          {
            component: 'Button',
            text: '取 消'
          }
        ]
      }
    },
  }
})
