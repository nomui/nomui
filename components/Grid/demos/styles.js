define([], function () {
  return {
    title: '不同样式',
    file: 'styles',
    demo: function () {
      let table = null

      return {
        component: 'Flex',
        gap: 'medium',
        gutter: 'md',
        rows: [
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'RadioList',
                options: [
                  { text: '无线条', value: null },
                  { text: '行线条', value: 'row' },
                  { text: '列线条', value: 'col' },
                  { text: '行列线条', value: 'both' },
                ],
                uistyle: 'button',
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
                uistyle: 'button',
                onValueChange: function (changed) {
                  table.update({
                    bordered: changed.newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                options: [
                  { text: '无斑马线', value: false },
                  { text: '有斑马线', value: true },
                ],
                uistyle: 'button',
                onValueChange: function (changed) {
                  table.update({
                    striped: changed.newValue,
                  })
                },
              },
            ],
          },
          {
            component: 'Grid',
            ref: (c) => {
              table = c
            },
            showTooltip: true,
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
                width: 100,
                ellipsis: true,
                render: function (tags) {
                  const tagItems = tags.map(function (tag) {
                    return {
                      text: tag,
                    }
                  })
                  return {
                    component: 'DataList',
                    gutter: 'md',
                    data: tagItems,
                    wrap: false,
                    itemRender: ({ itemData }) => {
                      return {
                        component: 'Tag',
                        attrs: {
                          style: {
                            padding: '2px 16px',
                          },
                        },
                        text: itemData.text,
                      }
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
