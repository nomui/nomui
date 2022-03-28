define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description:
      '通过 `content` 配置模态框的内容，当配置值为 `object` 时，默认会混入 `Panel` 的配置，该 `Panel` 的 `footer` 部分配置了确定和取消按钮。',
    demo: function () {
      return {
        children: {
          component: 'Button',
          name: 'button',
          text: '点我打开模态框',
          onClick: () => {
            new nomui.Modal({
              content: {
                header: {
                  caption: {
                    title: '提交成功!',
                  },
                },
                body: {
                  component: 'Flex',
                  styles: { padding: 1 },
                  gap: 'small',
                  align: 'center',
                  rows: [
                    // {
                    //   component: 'Caption',
                    //   title: '提交成功',
                    // },
                    { tag: 'span', children: '你现在还可以' },
                    {
                      component: 'List',
                      gutter: 'sm',
                      items: [
                        { text: '立项申请表' },
                        { text: '伦理申请表' },
                        { text: '试验研究方案' },
                        { text: '豁免知情同意表' },
                      ],
                      itemDefaults: {
                        _config: function () {
                          return this.setProps({
                            attrs: { style: { color: '#eee', backgroundColor: 'red' } },
                            styles: { border: true, color: 'lgray', padding: 1 },
                            children: {
                              component: 'Flex',
                              align: 'center',
                              rows: [
                                { component: 'Icon', type: 'upload' },
                                { tag: 'div', children: this.props.text },
                              ],
                            },
                          })
                        },
                      },
                    },
                  ],
                },
                footer: false,
              },
              onOk: ({ sender }) => {
                new nomui.Message({ type: 'info', content: '点击了确定按钮' })
                sender.close()
              },
            })
          },
        },
      }
    },
  }
})
