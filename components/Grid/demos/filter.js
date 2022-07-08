define([], function () {
  return {
    title: '列筛选',
    file: 'filter',
    demo: function () {
      let mygrid = null
      const mydata = [
        { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
        { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
        { id: 5, name: '射雕英雄传', author: '金庸', sales: 80000, role: '郭靖' },
      ]

      return {
        component: 'Grid',
        ref: (c) => {
          mygrid = c
        },
        onFilter: (data) => {
          // eslint-disable-next-line
          console.log(data)
          mygrid.update({ data: mygrid.props.data.reverse() })
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
            sortable: true,
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
                    text: '张三',
                    value: '1',
                  },
                  {
                    text: '李四',
                    value: 'b2bb',
                  },
                  {
                    text: '王五',
                    value: '3',
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
                component: 'CheckboxList',
                cols: 1,
                options: [
                  {
                    text: '金庸',
                    value: 0,
                  },
                  {
                    text: '古龙',
                    value: 1,
                  },
                  {
                    text: '梁羽生',
                    value: 3,
                  },
                  {
                    text: '温瑞安',
                    value: 4,
                  },
                ],
              }
            },
            width: 500,
          },
        ],
        data: mydata,
      }
    },
  }
})
