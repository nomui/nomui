define([], function () {
  return {
    title: '手动固定列',
    file: 'pin',
    demo: function () {
      return {
        component: 'Grid',
        key: 'grid-pin-demo',
        // allowFrozenCols: true,
        frozenRightCols: 1,
        columnsCustomizable: {
          cache: true,
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
            width: 100,
            title: '作者',
          },
          {
            field: 'sales',
            key: 'sales',
            title: '销量',
            width: 100,
          },
          {
            field: 'sales1',
            key: 'sales1',
            title: '销量1',
            width: 200,
          },
          {
            field: 'sales2',
            key: 'sales2',
            title: '销量2',
            width: 300,
          },
          {
            field: 'sales3',
            key: 'sales3',
            title: '销量3',
            width: 400,
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
          {
            id: 1,
            name: '笑傲江湖',
            author: '金庸',
            sales: 100000,
            sales1: 200000,
            sales2: 300000,
            sales3: 400000,
            role: '令狐冲',
          },
          {
            id: 4,
            name: '天龙八部',
            author: '金庸',
            sales: 300000,
            sales1: 400000,
            sales2: 500000,
            sales3: 600000,
            role: '乔峰',
          },
          {
            id: 5,
            name: '射雕英雄传',
            author: '金庸',
            sales: 0,
            sales1: 5000,
            sales2: 10000,
            sales3: 20000,
            role: '郭靖',
          },
        ],
      }
    },
  }
})
