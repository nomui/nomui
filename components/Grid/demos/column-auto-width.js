define([], function () {
  const genBtn = (text, type = 'default') => ({
    component: 'Button',
    text: text,
    attrs: { style: { marginRight: '5px' } },
    type,
    onClick: () => {
      console.log(text)
    },
  })
  return {
    title: '自动计算列宽',
    file: 'column-auto-width',
    description: '设置 `column.autoWidth`后，这一列的宽度会设置为子元素之和最宽的那个Td的宽度',
    demo: function () {
      return {
        component: 'Grid',
        showTitle: true,
        line: 'both',
        ellipsis: 'both',
        frozenRightCols: 1,
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
            width: 200,
          },
          {
            field: 'sales',
            key: 'sales',
            title: '销量',
            width: 500,
          },
          {
            field: 'role',
            key: 'role',
            title: '主角',
            showTitle: false,
          },
          {
            field: 'oper',
            title: '操作',
            // width: 50,
            autoWidth: true,
            cellRender: ({ rowData }) => {
              const children = []
              // 随机按钮个数
              // 无论多少个按钮，操作列都会一行排下
              const count = Math.ceil(Math.random() * 5)

              for (let i = 0; i < count; i++) {
                children.push(genBtn(rowData.name))
              }
              return children
            },
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
