define([], function () {
  return {
    title: '基础用法',
    file: 'in-modal',
    demo: function () {
      return {
        component: 'Button',
        text: '点击我',
        onClick: () => {
          new nomui.Modal({
            fit: true,
            content: {
              body: {
                children: {
                  component: 'Flex',
                  rows: [
                    {
                      component: 'Flex',
                      gap: 'small',
                      // align: 'start',
                      cols: [
                        {
                          component: 'Anchor',
                          sticky: 'auto',
                          container: 'auto',
                          activeKey: 'div3', // 默认高亮的key
                          onChange: (args) => {
                            // 高亮内容发生变化时回调
                            // eslint-disable-next-line
                            console.log(`当前高亮的是${args.key}`) // 获取当前高亮的项目
                          },
                          items: [
                            { text: '锚点1', key: 'div1' },
                            {
                              text: '锚点2',
                              key: 'div2',
                              items: [
                                { text: '锚点2-1', key: 'div2-1' },
                                {
                                  text: '锚点2-2',
                                  key: 'div2-2',
                                },
                              ],
                            },
                            { text: '锚点3', key: 'div3' },
                            { text: '锚点4', key: 'div4' },
                          ],
                        },
                        {
                          component: 'Rows',
                          items: [
                            {
                              component: 'AnchorContent',
                              key: 'div1',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div1',
                            },
                            {
                              component: 'AnchorContent',
                              key: 'div2',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div2',
                            },
                            {
                              component: 'AnchorContent',
                              key: 'div3',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div3',
                            },
                            {
                              component: 'AnchorContent',
                              key: 'div4',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div4',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      component: 'Flex',
                      gap: 'small',
                      // align: 'start',
                      cols: [
                        {
                          component: 'Anchor',
                          sticky: 'auto',
                          container: 'auto',
                          onChange: (args) => {
                            // 高亮内容发生变化时回调
                            // eslint-disable-next-line
                            console.log(`当前高亮的是${args.key}`) // 获取当前高亮的项目
                          },
                          items: [
                            { text: '锚点1', key: 'bdiv1' },
                            {
                              text: '锚点2',
                              key: 'bdiv2',
                              items: [
                                { text: '锚点2-1' },
                                {
                                  text: '锚点2-2',
                                },
                              ],
                            },
                            { text: '锚点3', key: 'bdiv3' },
                            { text: '锚点4', key: 'bdiv4' },
                          ],
                        },
                        {
                          component: 'Rows',
                          items: [
                            {
                              component: 'AnchorContent',
                              key: 'bdiv1',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div1',
                            },
                            {
                              component: 'AnchorContent',
                              key: 'bdiv2',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div2',
                            },
                            {
                              component: 'AnchorContent',
                              key: 'bdiv3',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div3',
                            },
                            {
                              component: 'AnchorContent',
                              key: 'bdiv4',
                              attrs: {
                                style: {
                                  height: '500px',
                                },
                              },
                              children: 'div4',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          })
        },
      }
    },
  }
})
