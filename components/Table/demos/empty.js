define([], function () {
  return {
    title: '空数据',
    file: 'empty',
    demo: function () {
      return {
        children: [
          {
            component: 'Table',
            // attrs: {
            //   style: {
            //     height: '500px',
            //   },
            // },
            data: [],
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
                    value: isMiddle,
                  }
                },
              },
            ],
          },
        ],
      }
    },
  }
})
