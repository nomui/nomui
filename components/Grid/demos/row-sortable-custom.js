define([], function () {
  let grid
  return {
    title: '行拖拽顺序(自定义拖拽触发位置)',
    file: 'row-sortable-custom',
    demo: function () {
      return {
        component: 'Grid',
        showTitle: true,
        ref: (c) => {
          grid = c
        },
        rowSortable: {
          customHandler: true,
          onEnd: () => {
            // eslint-disable-next-line
            console.log(grid.getDataKeys()) // 获取keyField对应新排序的数组
            // eslint-disable-next-line
            console.log(grid.getData()) // 获取整个data对应新排序的数组
          },
        },
        columns: [
          {
            field: 'order',
            title: '序号',
            width: 60,
            cellRender: ({ row }) => {
              return {
                component: 'Flex',
                align: 'center',
                cols: [
                  {
                    children: nomui.Grid.getRowSortableHandler(),
                  },
                  {
                    children: row.props.index + 1,
                  },
                ],
              }
            },
          },
          {
            field: 'name',
            key: 'name',
            title: '标题',
            width: 200,
          },
          {
            field: 'author',
            key: 'author',
            title: '作者',
          },
          {
            field: 'sales',
            key: 'sales',
            title: '销量',
          },

          {
            field: 'role',
            key: 'role',
            title: '主角',
            width: 500,
            showTitle: false,
          },
        ],
        data: [
          { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
          { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
          { id: 5, name: '射雕英雄传', author: '金庸', sales: 0, role: '郭靖' },
        ],
      }
    },
  }
})
