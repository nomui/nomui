define([], function () {
  const columns = [
    {
      field: 'name',
      key: 'name',
      title: '标题',
      width: 200,
      resizable: false,
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
    },
  ]

  const getOptions = () => {
    return columns
      .filter((item) => item.resizable === undefined)
      .map((item) => ({
        text: item.title,
        value: item.field,
      }))
  }

  let selectRef, gridRef
  return {
    title: '改变列宽',
    file: 'resizable',
    description: '设置 `columnResizable.cache` 为唯一值，则可实现对应表格列宽的本地缓存',

    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Grid',
            ref: (c) => {
              gridRef = c
            },
            columnResizable: {
              cache: 'resizable',
            },
            line: 'both',
            columns,
            data: [
              { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
              { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
              { id: 5, name: '射雕英雄传', author: '金庸', sales: 80000, role: '郭靖' },
            ],
          },
          {
            component: 'Flex',
            align: 'center',
            cols: [
              {
                component: 'Select',
                placeholder: '请选择需要重置的列,不选则为全部',
                ref: (c) => {
                  selectRef = c
                },
                options: getOptions(),
                value: null,
              },
              {
                component: 'Button',
                text: '重置列宽',
                onClick: () => {
                  console.log('🚀 ~ file: resizable.js ~ line 70 ~ args', selectRef.getValue())
                  gridRef.resetColsWidth(selectRef.getValue())
                },
              },
            ],
          },
        ],
      }
    },
  }
})
