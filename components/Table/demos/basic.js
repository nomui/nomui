define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Table',
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
        ],
      }
    },
  }
})
