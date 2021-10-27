define([], function () {
  return {
    title: '选择',
    file: 'row-checkable',
    demo: function () {
      let gridRef = null
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
                text: '下一页',
                onClick: () => {
                  gridRef.update({
                    data: [
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
                    ],
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
            rowCheckable: {
              checkedRowKeys: [5],
              checkboxRender: ({ row, rowData }) => {
                console.log('🚀 ~ file: row-checkable.js ~ line 82 ~ row', row)
                return { disabled: rowData.id === 4, value: rowData.id === 4 }
              },
            },
            columnsCustomizable: true,
            columns: [
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
              {
                field: 'tags',
                title: '标签',
                width: 200,
                key: '004',
                render: function (tags) {
                  const tagItems = tags.map(function (tag) {
                    return {
                      tagobj: tag,
                    }
                  })
                  return {
                    component: 'List',
                    gutter: 'md',
                    items: tagItems,
                    itemDefaults: {
                      styles: {
                        border: '1px',
                        padding: ['x-1', 'y-d125'],
                      },
                      _config: function () {
                        return this.setProps({
                          children: this.props.tagobj,
                        })
                      },
                    },
                  }
                },
              },
              {
                field: 'isMiddle',
                title: '是否中篇',
                width: 200,
                key: '005',
                render: function (isMiddle) {
                  return {
                    component: 'Checkbox',
                    value: isMiddle,
                  }
                },
              },
            ],
            data: [
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
            ],
          },
        ],
      }
    },
  }
})
