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
            treeConfig: {
              treeNodeColumn: 'class',
              initExpandLevel: 1,
              byIndicator: true,
            },
            frozenLeftCols: 1,
            columns: [
              {
                field: 'class',
                title: '班级',
                ellipsis: true,
                width: 400,
                toolbar: {
                  align: 'right', // 工具栏靠右
                  placement: 'both',
                  render: ({ row, cellData, rowData, index }) => {
                    console.log({ row, cellData, rowData, index })
                    return {
                      component: 'Toolbar',
                      visibleItems: 1,
                      type: 'link',
                      items: [
                        {
                          text: '导出',
                          onClick: () => {},
                        },
                        {
                          text: '导出Word',
                          onClick: () => {},
                        },
                        {
                          text: '导出Word',
                          onClick: () => {},
                        },
                      ],
                    }
                  },
                },
                cellRender: ({ cellData }) => {
                  return {
                    component: 'Tag',
                    text: cellData,
                  }
                },
                editRender: ({ cellData }) => {
                  return {
                    component: 'Textbox',
                    value: cellData,
                  }
                },
              },
              {
                field: 'count',
                title: '人数',
                // width: 200,
                // ellipsis: true,
                editRender: ({ cellData }) => {
                  return {
                    component: 'Textbox',
                    value: cellData,
                  }
                },
                cellRender: () => {
                  return {
                    component: 'Tag',
                    text: 'abc',
                  }
                },
              },
            ],
            editable: true,
            // excelMode: true,
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
              {
                id: '4',
                class: '大学',
                count: '-',
              },
            ],
          },
        ],
      }
    },
  }
})
