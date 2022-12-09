define([], function () {
  return {
    title: '列对齐方式',
    file: 'align',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Grid',
            showTitle: true,
            columnAlign: 'center', // 全局列对齐配置
            bordered: true,
            line: 'both',
            columns: [
              {
                field: 'name',
                key: 'name',
                title: '标题',
                width: 200,
                align: 'left', // 单独配置某一列对齐方式
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
                align: 'right',
              },
            ],
            data: [
              { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
              { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
              { id: 5, name: '射雕英雄传', author: '金庸', sales: 0, role: '郭靖' },
            ],
          },
          {
            tag: 'p',
            styles: {
              text: 'danger',
            },
            children: '注意，自定义渲染的内容可能无法通过此属性控制对齐方式，需要自行处理',
          },
        ],
      }
    },
  }
})
