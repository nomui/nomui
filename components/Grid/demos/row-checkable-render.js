define([], function () {
  return {
    title: '选择-自定义渲染checkbox框',
    file: 'row-checkable-render',
    description:
      '通过`rowCheckable.checkboxRender`函数返回的`{disabled, hidden, value}`等配置，来控制对应行的复选框的`props`',
    demo: function () {
      let gridRef = null

      const data = [
        {
          id: 0,
          name: '笑傲江湖',
          author: '金庸',
          role: '令狐冲',
          tags: ['中篇', '明朝'],
          isMiddle: true,
        },
        {
          id: 4,
          name: '天龙八部',
          author: '金庸',
          role: '乔峰',
          tags: ['长篇', '宋朝'],
          isMiddle: false,
        },
        {
          id: 5,
          name: '射雕英雄传',
          author: '金庸',
          role: '郭靖',
          tags: ['长篇', '元朝'],
          isMiddle: false,
        },
        {
          id: 6,
          name: '大主宰',
          author: '土豆',
          role: '林动',
          tags: ['玄幻', '都市'],
          isMiddle: true,
        },
        {
          id: 7,
          name: '武动乾坤',
          author: '土豆',
          role: '林动',
          tags: ['玄幻', '都市'],
          isMiddle: true,
        },
        {
          id: 8,
          name: '斗破苍穹',
          author: '土豆',
          role: '萧炎',
          tags: ['玄幻', '都市'],
          isMiddle: true,
        },
        {
          id: 9,
          name: '斗罗大陆',
          author: '三少',
          role: '令狐冲',
          tags: ['中篇', '明朝'],
          isMiddle: true,
        },
      ]

      return {
        component: 'Rows',
        items: [
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: '获取选中行',
                onClick: () => {
                  new nomui.Alert({
                    type: 'info',
                    description: {
                      component: 'Rows',
                      items: [
                        {
                          children: gridRef.getCheckedRowKeys().toString(),
                        },
                      ],
                    },
                  })
                },
              },
              {
                component: 'Button',
                text: `隐藏偶数行的checkbox, 且除了id 不为0的奇数行选中`,
                onClick: () => {
                  gridRef.update({
                    rowCheckable: {
                      checkboxRender: ({ row, rowData, index }) => {
                        console.log('🚀 ~ file: row- 99 ~ row', row)
                        const hidden = index % 2 === 0
                        const value = index % 2 === 1 && rowData.id !== 0
                        return { hidden, value }
                      },
                    },
                  })
                },
              },
            ],
          },
          {
            component: 'Grid',
            ref: (c) => {
              gridRef = c
            },
            columnsCustomizable: true,
            rowCheckable: {},
            columns: [
              {
                field: 'id',
                title: 'ID',
                key: '000',
                width: 60,
              },
              {
                field: 'name',
                title: '标题',
                key: '001',
              },
              {
                field: 'author',
                title: '作者',
                width: 200,
                key: '002',
              },
              {
                field: 'role',
                title: '主角',
                width: 200,
                key: '003',
              },
            ],
            data,
          },
        ],
      }
    },
  }
})
