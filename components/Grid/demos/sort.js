define([], function () {
  let grid1
  const mydata = [
    { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
    { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
    { id: 5, name: '射雕英雄传', author: '金庸', sales: 80000, role: '郭靖' },
  ]
  return {
    title: '列排序',
    file: 'sort',
    description:
      '配置 `defaultSort: {field, sortDirection}` (sortDirection: "asc" | "desc") 实现表格的默认排序`',
    demo: function () {
      return {
        component: 'Flex',
        gutter: 'large',
        rows: [
          {
            component: 'Grid',

            key: 'grid-sort',
            columnsCustomizable: {
              cache: true,
            },
            // forceSort: true,
            allowFrozenCols: true,
            defaultSort: { field: 'name', sortDirection: 'asc' },
            onSort: (args) => {
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ data: mydata.reverse() })
                }, 3000)
              }).then((data) => {
                grid1.update({
                  data: data.data,
                })
              })
              // eslint-disable-next-line
              console.log(args, '更新了data顺序')
            },
            ref: (c) => {
              grid1 = c
            },

            columns: [
              {
                field: 'name',
                key: 'name',
                title: '标题',
                width: 200,
                sortable: true,
              },
              {
                field: 'author',
                key: 'author',
                title: '作者',
                sortable: true,
              },
              {
                field: 'sales',
                key: 'sales',
                title: '销量',
                sortable: (a, b) => b.sales - a.sales,
              },

              {
                field: 'role',
                key: 'role',
                title: '主角',
                width: 500,
              },
            ],

            data: mydata,
          },

          {
            component: 'Button',
            text: '重置排序状态',
            onClick: () => {
              grid1.resetSort()
            },
          },
        ],
      }
    },
  }
})
