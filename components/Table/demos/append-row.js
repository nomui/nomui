define([], function () {
  return {
    title: '新增行',
    file: 'append-row',
    demo: function () {
      let tableRef = null

      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Table',
            ref: (c) => {
              tableRef = c
            },
            line: 'both',
            bordered: true,
            columns: [
              {
                field: 'name',
                title: '标题',
              },
              {
                field: 'author',
                title: '作者',
                width: 200,
              },
              {
                field: 'role',
                title: '主角',
                width: 200,
              },
              {
                field: 'tags',
                title: '标签',
                width: 200,
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
                cellRender: ({ cellData: isMiddle }) => {
                  return {
                    component: 'Checkbox',
                    plain: true,
                    value: isMiddle,
                  }
                },
              },
            ],
            data: [
              {
                id: 1,
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
          {
            component: 'Button',
            text: '新增一行',
            onClick: () => {
              tableRef.appendRow({
                data: {
                  id: 5,
                  name: '神雕侠侣',
                  author: '金庸',
                  role: '杨过',
                  tags: ['长篇', '元朝'],
                  isMiddle: false,
                },
              })
            },
          },
        ],
      }
    },
  }
})
