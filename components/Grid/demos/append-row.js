define([], function () {
  return {
    title: '新增行',
    file: 'append-row',
    demo: function () {
      let gridRef = null

      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Grid',
            ref: (c) => {
              gridRef = c
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
            data: [],
          },
          {
            component: 'Button',
            text: '新增一行',
            onClick: () => {
              gridRef.appendRow({
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
