define([], function () {
  return {
    title: '不同样式',
    file: 'styles',
    demo: function () {
      let table = null

      return {
        component: 'Rows',
        gutter: 'md',
        items: [
          {
            component: 'Cols',
            items: [
              {
                component: 'RadioList',
                options: [
                  { text: '无线条', value: null },
                  { text: '行线条', value: 'row' },
                  { text: '列线条', value: 'col' },
                  { text: '行列线条', value: 'both' },
                ],
                type: 'button',
                onValueChange: function (changed) {
                  table.update({
                    line: changed.newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                options: [
                  { text: '无边框', value: null },
                  { text: '有边框', value: true },
                ],
                type: 'button',
                onValueChange: function (changed) {
                  table.update({
                    bordered: changed.newValue,
                  })
                },
              },
            ],
          },
          {
            component: 'Table',
            ref: (c) => {
              table = c
            },
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
