define([], function () {
  return {
    title: '可删除',
    file: 'allow-clear',
    demo: function () {
      return {
        component: 'Flex',
        rows: [{
          component: 'TreeSelect',
          allowClear: true,
          ref: (c) => {
            window.c = c
          },
          options: [
            {
              text: '总经办',
              value: '0-0',
              children: [
                {
                  text: '人事部',
                  value: '0-0-1',
                },
                {
                  text: '行政部',
                  value: '0-0-2',
                },
              ],
            },
            {
              text: '技术中心',
              value: '0-1',
              children: [
                {
                  text: '后端组',
                  value: '0-1-1',
                  children: [
                    {
                      text: '开发一组',
                      value: '0-1-1-1',
                    },
                    {
                      text: '开发二组',
                      value: '0-1-1-2',
                    },
                  ],
                },
                {
                  text: '前端组',
                  value: '0-1-2',
                },
              ],
            },
          ],
          value: ['0-0', '0-0-1'],
          treeCheckable: {},
          initExpandLevel: 1,
        },
        {
          component: 'Button',
          text: 'update',
          onClick: () => {
            window.c.update({ allowClear: false })
            // window.c.setValue(['0-0'])
          }
        }
        ],
      }
    },
  }
})
