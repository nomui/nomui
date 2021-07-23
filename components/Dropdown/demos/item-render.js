define([], function () {
  return {
    title: '自定义内容',
    file: 'item-render',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Dropdown',
            text: '下拉菜单',
            itemRender: (data) => {
              return {
                component: 'Cols',
                justify: 'between',
                items: [
                  {
                    children: data.text,
                  },
                  {
                    component: 'Badge',
                    text: data.count,
                    size: 'xs',
                    styles: {
                      color: 'yellow',
                    },
                  },
                ],
              }
            },
            items: [
              {
                text: '待审核',
                count: 5,
                onClick: () => {},
              },
              {
                text: '待提交',
                count: 12,
                onClick: () => {},
              },
              {
                text: '已撤回',
                count: 3,
                onClick: () => {},
              },
            ],
          },
        ],
      }
    },
  }
})
