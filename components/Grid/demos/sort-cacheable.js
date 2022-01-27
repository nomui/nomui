define([], function () {
  let grid1
  const mydata = [
    { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
    { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
    { id: 5, name: '射雕英雄传', author: '金庸', sales: 80000, role: '郭靖' },
  ]
  return {
    title: '缓存上次列排序',
    file: 'sort-cacheable',
    demo: function () {
      return {
        component: 'Flex',
        gutter: 'large',
        rows: [
          {
            component: 'Grid',

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
              console.log(args, '直接触发onSort,更新了data顺序')
            },
            ref: (c) => {
              window.grid1 = grid1 = c
            },
            key: 'grid-demo-sort',
            sortCacheable: true,
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
            // onCreated: ({ inst }) => {
            //   new Promise((resolve) => {
            //     setTimeout(() => {
            //       resolve({ data: mydata })
            //     }, 3000)
            //   }).then((data) => {
            //     inst.update({
            //       data: data.data,
            //     })
            //   })
            // },
            data: mydata,
          },
          {
            children:
              '如果配置了sortCacheable，则会检查排序缓存，如果有排序缓存会直接进入onSort回调',
          },
          {
            styles: {
              text: 'danger',
            },
            children: '注意：所有涉及到本地缓存的功能，代码当中Grid组件必须配置唯一标识key！',
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
