define([], function () {
  return {
    title: '列工具栏',
    file: 'column-tools',
    demo: function () {
      return {
        component: 'Grid',
        showTitle: true,
        rowSelectable: {
          onSelect: (args) => {
            console.log(args)
          },
        },
        frozenRightCols: 1,
        ellipsis: 'both',
        excelMode: true,
        columns: [
          {
            field: 'name',
            key: 'name',
            title: '标题',
            width: 100,
            sortable: 'string',
            cellRender: ({ cellData }) => {
              return {
                tag: 'a',
                children: cellData,
              }
            },
            ellipsis: true,
            toolbar: {
              // align: 'right',
              hover: true,
              placement: 'both',
              render: ({ row, cellData, rowData, index }) => {
                console.log({ row, cellData, rowData, index })
                return {
                  component: 'Toolbar',
                  visibleItems: 0,
                  size: 'small',
                  type: 'text',
                  items: [
                    {
                      text: '导出Word',
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
          },
          {
            field: 'author',
            title: '作者',
            width: 200,
            cellRender: ({ cellData }) => {
              return {
                component: 'Tag',
                color: 'olive',
                text: cellData,
              }
            },
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
          },

          {
            field: 'role',
            title: '主角',
            width: 1500,
            showTitle: false,
          },

          {
            field: 'sales',
            title: '销量',
            // width: 150,
            autoWidth: true,
            cellRender: () => {
              return ''
            },
            toolbar: {
              align: 'right',
              placement: 'body',
              render: ({ row, cellData, rowData, index }) => {
                console.log({ row, cellData, rowData, index })
                return {
                  component: 'Toolbar',
                  visibleItems: 3,
                  size: 'small',
                  type: 'text',
                  items: [
                    {
                      text: '导出Word',
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
          },
        ],
        data: [
          { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
          { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
          {
            id: 5,
            name: '射雕英雄传射雕英雄传射雕英雄传射雕英雄传',
            author: '金庸',
            sales: 0,
            role: '郭靖',
          },
        ],
      }
    },
  }
})
