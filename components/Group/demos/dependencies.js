define([], function () {
  return {
    title: '监听其他字段值变化',
    file: 'dependencies',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Group',
            fields: [
              {
                component: 'Textbox',
                name: 'name',
                label: '姓名',
              },
              {
                component: 'RadioList',
                name: 'hasUsedName',
                label: '是否有曾用名',
                options: [
                  { text: '无', value: '1' },
                  { text: '有', value: '2' },
                ],
              },
              {
                component: 'Textbox',
                name: 'usedName',
                dependencies: ['hasUsedName'],
                label: '曾用名',
              },
              {
                component: 'RadioList',

                name: 'hasCriminalHistory',
                label: '本人是否有犯罪历史',
                options: [
                  { text: '否', value: '1' },
                  { text: '是', value: '2' },
                ],
              },
              {
                component: 'RadioList',

                name: 'hasCriminalHistoryOfFamily',
                label: '直系亲属是否有犯罪历史',
                options: [
                  { text: '否', value: '1' },
                  { text: '是', value: '2' },
                ],
              },
              {
                component: 'MultilineTextbox',
                name: 'criminalHistory',
                dependencies: ['hasCriminalHistory', 'hasCriminalHistoryOfFamily'],
                label: '犯罪历史描述',
                placeholder: '请填写犯罪历史',
              },
              {
                component: 'Group',
                inline: true,
                name: 'otherInfo',
                label: '免责声明',
                fields: [
                  {
                    component: 'Checkbox',
                    name: 'agree',
                    required: true,
                    label: '我已阅读用户协议',
                  },
                  {
                    component: 'Checkbox',
                    name: 'isAdult',
                    required: true,
                    label: '我以年满18周岁',
                  },
                ],
              },
              {
                component: 'Button',
                dependencies: ['otherInfo.agree', 'otherInfo.isAdult'],
                name: 'submit',
                text: '提交',
                attrs: {
                  style: {
                    marginLeft: '190px',
                  },
                },
                type: 'primary',
              },
            ],
          },
        ],
      }
    },
  }
})
