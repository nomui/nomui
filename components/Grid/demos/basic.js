define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Grid',
        showTitle: true,
        rowSelectable: {
          onSelect: (args) => {
            console.log(args)
          },
        },

        columns: [
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
