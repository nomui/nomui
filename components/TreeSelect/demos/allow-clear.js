define([], function () {
  return {
    title: '可删除',
    file: 'allow-clear',
    demo: function () {
      return {
        children: {
          component: 'TreeSelect',
          allowClear: true,
          treeData: [
            {
              text: '总经办',
              key: '0-0',
              children: [
                {
                  text: '人事部',
                  key: '0-0-1',
                },
                {
                  text: '行政部',
                  key: '0-0-2',
                },
              ],
            },
            {
              text: '技术中心',
              key: '0-1',
              children: [
                {
                  text: '后端组',
                  key: '0-1-1',
                  children: [
                    {
                      text: '开发一组',
                      key: '0-1-1-1',
                    },
                    {
                      text: '开发二组',
                      key: '0-1-1-2',
                    },
                  ],
                },
                {
                  text: '前端组',
                  key: '0-1-2',
                },
              ],
            },
          ],
          value: ['0-0', '0-0-1'],
          treeCheckable: {},
        },
      }
    },
  }
})
