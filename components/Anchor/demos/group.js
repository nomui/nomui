define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let containerRef = null
      return {
        component: 'Layout',
        attrs: {
          style: {
            height: '400px',
          },
        },
        header: {
          children: '群组',
        },
        body: {
          ref: (c) => {
            containerRef = c
          },
          children: {
            component: 'Flex',
            gap: 'small',
            // align: 'start',
            cols: [
              {
                component: 'Anchor',
                sticky: () => {
                  return containerRef
                },
                container: () => {
                  return containerRef
                },
                activeKey: 'div1', // 默认高亮的key
                onChange: (args) => {
                  // 高亮内容发生变化时回调
                  // eslint-disable-next-line
                  console.log(`当前高亮的是${args.key}`) // 获取当前高亮的项目
                },
                itemDefaults: {
                  _config: function () {
                    this.setProps({
                      tools: {
                        component: 'Icon',
                        type: 'check',
                        styles: {
                          text: 'green',
                        },
                        hidden: !this.props.approved,
                      },
                    })
                  },
                },
                items: [
                  { text: '群组1', key: 'div1', approved: true },
                  {
                    text: '群组2',
                    key: 'div2',
                  },
                  { text: '群组3', key: 'div3' },
                  { text: '群组4', key: 'div4' },
                ],
              },
              {
                component: 'Group',
                fields: [
                  {
                    component: 'Group',
                    label: '群组1',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div1', // 设置群组key
                    },

                    fields: [
                      {
                        component: 'Textbox',
                      },
                      {
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                  {
                    component: 'Group',
                    label: '群组2',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div2', // 设置群组key
                    },
                    fields: [
                      {
                        component: 'Textbox',
                      },
                      {
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                  {
                    component: 'Group',
                    label: '群组3',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div3', // 设置群组key
                    },
                    fields: [
                      {
                        component: 'Textbox',
                      },
                      {
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                  {
                    component: 'Group',
                    label: '群组4',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div4', // 设置群组key
                    },
                    fields: [
                      {
                        component: 'Textbox',
                      },
                      {
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }
    },
  }
})
