define([], function () {
  return {
    title: '树形数据',
    file: 'tree-grid',
    demo: function () {
      return {
        children: [
          {
            component: 'Grid',
            treeConfig: {
              treeNodeColumn: 'class',
              initExpandLevel: 1,
            },
            columns: [
              {
                field: 'class',
                title: '班级',
              },
              {
                field: 'count',
                title: '人数',
                width: 200,
              },
            ],
            data: [
              {
                id: '1',
                class: '小学',
                count: '-',
                children: [
                  {
                    id: '1.1',
                    class: '一年级',
                    count: '-',
                    children: [
                      {
                        id: '1.1.1',
                        class: '1班',
                        count: 30,
                      },
                      {
                        id: '1.1.2',
                        class: '2班',
                        count: 31,
                      },
                    ],
                  },
                  {
                    id: '2',
                    class: '二年级',
                    count: '-',
                    children: [
                      {
                        id: '2.1',
                        class: '1班',
                        count: '-',
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                class: '中学',
                count: '-',
                children: [
                  {
                    id: '3.1',
                    class: '七年级',
                    count: '-',
                    children: [
                      {
                        id: '3.1.1',
                        class: '1班',
                        count: '-',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
