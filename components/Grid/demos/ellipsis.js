define([], function () {
  return {
    title: '单元格省略',
    file: 'ellipsis',
    demo: function () {
      return {
        component: 'Grid',
        ellipsis: 'both', // 'header' | 'body'
        showTooltip: true,
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
            width: 200,
            ellipsis: false,
          },
        ],
        data: [
          {
            id: 1,
            name: '笑傲江湖笑傲江湖笑傲江湖笑傲江湖',
            author: '金庸金庸金庸金庸金庸金庸',
            sales: 100000,
            role: '令狐冲、东方不败、任我行、岳不群、左冷禅、田伯光、桃谷六仙等等',
          },
          {
            id: 4,
            name: '天龙八部天龙八部天龙八部天龙八部',
            author: '金庸金庸金庸金庸金庸金庸',
            sales: 200000,
            role: '乔峰',
          },
          {
            id: 5,
            name: '笑傲江湖笑傲江湖笑傲江湖笑傲江湖',
            author: '金庸金庸金庸金庸金庸金庸',
            sales: 80000,
            role: '郭靖',
          },
        ],
      }
    },
  }
})
