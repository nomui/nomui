define([], function () {
  return {
    title: '监听其他字段值变化',
    file: 'dependencies',
    demo: function () {
      let criminalCount = 0,
        agreeCount = 0
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
                  { text: '是', value: '1' },
                  { text: '否', value: '2' },
                ],
              },
              {
                component: 'Textbox',
                name: 'usedName',
                dependencies: ['hasUsedName'],
                onDependencyValueChange: (args) => {
                  // 监听hasUsedName字段的值变化，显示或隐藏usedName字段
                  if (args.name === 'hasUsedName') {
                    if (args.newValue === '1') {
                      args.sender.show()
                    } else {
                      args.sender.hide()
                    }
                  }
                },
                hidden: true,
                label: '曾用名',
              },
              {
                component: 'RadioList',
                name: 'hasCriminalHistory',
                label: '本人是否有犯罪历史',
                options: [
                  { text: '是', value: '1' },
                  { text: '否', value: '2' },
                ],
              },
              {
                component: 'RadioList',
                name: 'hasCriminalHistoryOfFamily',
                label: '直系亲属是否有犯罪历史',
                options: [
                  { text: '是', value: '1' },
                  { text: '否', value: '2' },
                ],
              },
              {
                component: 'MultilineTextbox',
                name: 'criminalHistory',
                dependencies: ['hasCriminalHistory', 'hasCriminalHistoryOfFamily'],
                onDependencyValueChange: (args) => {
                  // 两个依赖字段任意一个选中时，显示犯罪历史描述
                  if (
                    args.name === 'hasCriminalHistory' ||
                    args.name === 'hasCriminalHistoryOfFamily'
                  ) {
                    if (args.newValue === '1') {
                      criminalCount++
                      if (criminalCount > 0) {
                        args.sender.show()
                      }
                    } else {
                      criminalCount--
                      if (criminalCount <= 0) {
                        args.sender.hide()
                      }
                    }
                  }
                },
                hidden: true,
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
                component: 'Field',
                name: 'submit',
                label: '',
                dependencies: ['otherInfo.agree', 'otherInfo.isAdult'],
                onDependencyValueChange: (args) => {
                  // 两个依赖勾选框都选中时，才显示提交按钮
                  if (args.name === 'agree' || args.name === 'isAdult') {
                    if (args.newValue === true) {
                      agreeCount++
                      if (agreeCount === 2) {
                        args.sender.show()
                      }
                    } else {
                      agreeCount--
                      if (agreeCount < 2) {
                        args.sender.hide()
                      }
                    }
                  }
                },
                hidden: true,
                control: {
                  component: 'Button',
                  text: '提交',
                  type: 'primary',
                },
              },
            ],
          },
        ],
      }
    },
  }
})
