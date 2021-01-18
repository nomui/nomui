define([], function () {
  return {
    title: '表单数据',
    file: 'value',
    demo: function () {
      let form = null

      return {
        children: {
          component: 'Form',
          ref: (c) => {
            form = c
          },
          value: {
            country: '我是中国人',
            name: 'Jerry',
          },
          fields: [
            {
              name: 'country',
              label: '国家',
              control: {
                component: 'TextControl',
              },
            },
            {
              name: 'name',
              label: '姓名',
              control: {
                component: 'Textbox',
                required: true,
                rules: [
                  { type: 'identifier' },
                  { type: 'minlength', value: 2 },
                  { type: 'maxlength', value: 12 },
                ],
              },
            },
            {
              name: 'age',
              label: '年龄',
              control: {
                component: 'Numberbox',
                required: true,
                min: 0,
                max: 100,
              },
            },
            {
              name: 'email',
              label: 'Email',
              control: {
                component: 'Textbox',
                required: true,
                rules: [{ type: 'email', message: 'Email 格式不正确' }],
              },
            },
            {
              name: 'gender',
              label: '性别',
              control: {
                component: 'RadioList',
                options: [
                  { text: '男', value: 0 },
                  { text: '女', value: 1 },
                ],
              },
              value: 0,
            },
            {
              name: 'hobbies',
              label: '爱好',
              control: {
                component: 'CheckboxList',
                options: [
                  { text: '唱歌', value: 1 },
                  { text: '跳舞', value: 2 },
                  { text: '旅游', value: 3 },
                ],
              },
              value: [1, 3],
            },
            {
              name: 'city',
              label: '城市',
              control: {
                component: 'Select',
                options: [
                  { text: '北京', value: 1 },
                  { text: '上海', value: 2 },
                  { text: '广州', value: 3 },
                ],
              },
              value: 3,
            },
            {
              label: '',
              control: {
                component: 'Button',
                text: '提交',
                onClick: () => {
                  console.log(form.getValue())
                }
              },
            },
          ],
        },
      }
    },
  }
})
