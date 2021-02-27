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
              name: 'address',
              label: '住址',
              required: true,
              disabled: true,
            },
            {
              component: 'RadioList',
              name: 'gender',
              label: '性别',
              options: [
                { text: '射雕英雄传', value: 0 },
                { text: '白马啸西风', value: 1 },
                { text: '射雕英雄传', value: 0 },
                { text: '白马啸西风', value: 1 },
                { text: '射雕英雄传', value: 0 },
                { text: '白马啸西风', value: 1 },
                { text: '射雕英雄传', value: 0 },
                { text: '白马啸西风', value: 1 },
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
