define([], function () {
  return {
    title: '树形数据',
    file: 'tree-grid',
    description: '通过配置 `treeConfig` 展示树形数据',
    demo: function () {
      return {
        children: [
          {
            component: 'Grid',
            ref: (c) => {
              window.treeGridRef = c
            },
            treeConfig: {
              treeNodeColumn: 'class',
              initExpandLevel: 1,
            },
            rowSortable: {
              allowCrossParent: false, // 配置false禁止跨父级拖拽
              onEnd: () => {
                // eslint-disable-next-line
                // console.log(grid.getDataKeys()) // 获取keyField对应新排序的数组
                // // eslint-disable-next-line
                // console.log(grid.getData()) // 获取整个data对应新排序的数组
              },
              onMove: (evt) => {
                // 简单的示例如何限制拖拽,实际上本身就不允许跨层级拖拽
                const { dragged, related } = evt
                if (
                  dragged.getAttribute('parentNodeKey') !== related.getAttribute('parentNodeKey')
                ) {
                  return false
                }
                return true
              },
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
                parentItemKey: null,
                children: [
                  {
                    id: '1.1',
                    class: '一年级',
                    count: '-',
                    parentItemKey: '1',
                    children: [
                      {
                        id: '1.1.1',
                        class: '1班',
                        count: 30,
                        parentItemKey: '1.1',
                      },
                      {
                        id: '1.1.2',
                        class: '2班',
                        count: 31,
                        parentItemKey: '1.1',
                      },
                    ],
                  },
                  {
                    id: '2',
                    class: '二年级',
                    count: '-',
                    parentItemKey: '1',
                    children: [
                      {
                        id: '2.1',
                        class: '1班',
                        count: '-',
                        parentItemKey: '2',
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                class: '中学',
                count: '-',
                parentItemKey: null,
                children: [
                  {
                    id: '3.1',
                    class: '七年级',
                    count: '-',
                    parentItemKey: '3',
                    children: [
                      {
                        id: '3.1.1',
                        class: '1班',
                        count: '-',
                        parentItemKey: '3.1',
                      },
                    ],
                  },
                ],
              },
              {
                id: '4',
                class: '大学',
                count: '-',
                parentItemKey: null,
              },
            ],
          },
        ],
      }
    },
  }
})
