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
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Grid',
        showTitle: true,
        line: 'both',
        columns: [
          {
            field: 'name',
            key: 'name',
            title: '标题',
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
            showTitle: false,
          },
          {
            field: 'oper',
            title: '操作',
            autoWidth: true,
            cellRender: ({ rowData, index }) => {
              const children = []

              for (let i = 0; i <= index; i++) {
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
