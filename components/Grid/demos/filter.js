define([], function () {
  return {
    title: '列筛选',
    file: 'filter',
    demo: function () {
      return {
        component: 'Grid',
        onFilter: (data) => {
          console.log(data)
        },
        columns: [
          {
            field: 'name',

            title: '标题',
            width: 200,
            filter: () => {
              return {
                component: 'Textbox',
              }
            },
          },
          {
            field: 'author',

            title: '作者',
          },
          {
            field: 'sales',

            title: '销量',
            filter: () => {
              return {
                component: 'Select',
                options: [
                  {
                    text: 'aaa',
                    value: 'aaa',
                  },
                  {
                    text: 'bbb',
                    value: 'bbb',
                  },
                  {
                    text: 'ccc',
                    value: 'ccc',
                  },
                ],
              }
            },
          },

          {
            field: 'role',

            title: '主角',
            filter: () => {
              return {
                component: 'Textbox',
              }
            },
            width: 500,
          },
        ],
        data: [
          { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
          { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
          { id: 5, name: '射雕英雄传', author: '金庸', sales: 80000, role: '郭靖' },
        ],
      }
    },
  }
})
