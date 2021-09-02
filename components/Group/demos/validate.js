define([], function () {
  return {
    title: '验证字段组',
    file: 'validate',
    demo: function () {
      let group = null

      return {
        children: {
          component: 'Group',
          ref: (c) => {
            group = c
          },
          fields: [
            {
              component: 'Textbox',
              name: 'name',
              label: '姓名',
              required: true,
              rules: [
                { type: 'identifier' },
                { type: 'minlength', value: 2 },
                { type: 'maxlength', value: 12 },
              ],
              invalidTip: {
                attrs: {
                  style: {
                    margin: '20px',
                  },
                },
              },
            },
            {
              component: 'Numberbox',
              name: 'age',
              label: '年龄',
              min: 0,
              max: 100,
            },
            {
              component: 'Textbox',
              name: 'email',
              label: 'Email',
              required: true,
              rules: [{ type: 'email', message: 'Email 格式不正确' }],
            },
            {
              component: 'Textbox',
              name: 'IDCard',
              label: '身份证号码',
              required: true,
              rules: [{ type: 'IDCard' }],
            },
            {
              component: 'Textbox',
              name: 'address',
              label: '住址',
              required: true,
              disabled: true,
            },

            {
              component: 'CheckboxList',
              name: 'hobbies',
              required: true,
              label: '爱好',
              options: [
                { text: '唱歌', value: 1 },
                { text: '跳舞', value: 2 },
                { text: '旅游', value: 3 },
              ],
            },
            {
              component: 'Field',
              label: '',
              control: {
                component: 'Button',
                text: '提 交',
                type: 'Primary',
                onClick: function () {
                  group.validate()
                },
              },
            },
          ],
        },
      }
    },
  }
})
