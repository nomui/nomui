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
          fieldDefaults: {
            labelAlign: 'left',
          },
          fields: [
            {
              component: 'Textbox',
              name: 'name',
              label: '姓名',
              // required: true,
              rules: [
                { type: 'required', soft: true },
                { type: 'minlength', value: 2, soft: true },
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
              component: 'Select',
              name: 'school',
              label: '学校',
              options: [{ text: '清华' }, { text: '清华' }, { text: '清华' }],
              require: true,
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
              // rules: [{ type: 'IDCard' }],
            },
            {
              component: 'Textbox',
              name: 'noScript',
              label: '禁止输入危险脚本标签',
              required: true,
              rules: [{ type: 'noScript' }],
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
                component: 'Cols',
                items: [
                  {
                    component: 'Button',
                    text: '校验',
                    type: 'Primary',
                    onClick: function () {
                      console.log(group.validate())
                    },
                  },
                  {
                    component: 'Button',
                    text: '校验但忽略必填',
                    tooltip: '用于某些特殊场景，需要忽略必填验证时使用',
                    onClick: function () {
                      group.validate()
                    },
                  },
                  {
                    component: 'Button',
                    text: '软校验',
                    tooltip:
                      '校验结果会忽略那些配置了block:false的非阻断规则，但会返回这些规则不通过的字段信息',
                    onClick: function () {
                      console.log(group.softValidate())
                    },
                  },
                ],
              },
            },
          ],
        },
      }
    },
  }
})
