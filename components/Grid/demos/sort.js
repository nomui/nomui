define([], function () {
  let grid1
  return {
    title: '列排序',
    file: 'sort',
    demo: function () {
      return {
        children: [
          {
            component: 'Grid',
            onSort: (data) => {
              console.log(data)
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
                sortable: (a, b) => a.sales - b.sales,
              },

              {
                field: 'role',
                key: 'role',
                title: '主角',
                width: 500,
              },
            ],
            data: [
              { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
              { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
              { id: 5, name: '射雕英雄传', author: '金庸', sales: 80000, role: '郭靖' },
            ],
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
