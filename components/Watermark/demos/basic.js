define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '',
    demo: function () {
      return {
        component: 'Watermark',
        attrs: {
          style: {
            height: '500px'
          }
        },
        text: 'NomUI Watermark',
        content: {
          component: 'Form',
          fields: [
            {
              component: 'Textbox',
              name: 'name',
              label: '姓名',
            },
            {
              component: 'Numberbox',
              name: 'age',
              label: '年龄',
            },
            {
              component: 'Textbox',
              name: 'email',
              label: 'Email',
            },
            {
              component: 'Checkbox',
              name: 'test',
              label: 'test',
            },

            {
              component: 'RadioList',
              name: 'gender',
              label: '性别',
              options: [
                { text: '男', value: 0 },
                { text: '女', value: 1 },
              ],
            },
            {
              component: 'CheckboxList',
              name: 'hobbies',
              label: '爱好',
              options: [
                { text: '唱歌', value: 1 },
                { text: '跳舞', value: 2 },
                { text: '旅游', value: 3 },
              ],
            },
          ]
        }

      }
    },
  }
})
