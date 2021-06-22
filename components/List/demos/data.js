define([], function () {
  return {
    title: '数据列表',
    file: 'data',
    description:
      '当设置了 `data` 属性为数组类型时，可以通过 `itemRender` 配置来返回 `item` 的组件配置，在渲染数据集合时，用这种方式会更方便，操作数据也更便捷。',
    demo: function () {
      let listRef = null

      const books = [
        { name: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
        { name: '雪山飞狐', publisher: '三联出版社', publication_year: '1980' },
        { name: '连城诀', publisher: '三联出版社', publication_year: '1980' },
        { name: '天龙八部', publisher: '三联出版社', publication_year: '1980' },
        { name: '射雕英雄传', publisher: '三联出版社', publication_year: '1980' },
      ]
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            children: {
              component: 'Button',
              text: '新增',
              type: 'primary',
              onClick: () => {
                listRef.appendDataItem({
                  name: '飞狐外传',
                  publisher: '三联出版社',
                  publication_year: '1980',
                })
              },
            },
          },
          {
            children: {
              component: 'List',
              ref: (c) => {
                listRef = c
              },
              gutter: 'md',
              data: books,
              itemRender: ({ itemData, item }) => {
                return {
                  component: 'Flex',
                  gap: 'small',
                  rows: [
                    {
                      children: {
                        tag: 'img',
                        attrs: {
                          src: `/docs/images/books/${itemData.name}.jpg`,
                        },
                      },
                    },
                    { children: itemData.name },
                    {
                      children: {
                        styles: {
                          text: 'muted',
                        },
                        children: `${itemData.publisher} / ${itemData.publication_year}`,
                      },
                    },
                    {
                      children: {
                        cols: [
                          {
                            children: {
                              component: 'Button',
                              text: '删除',
                              danger: true,
                              onClick: () => {
                                item.remove()
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                }
              },
            },
          },
        ],
      }
    },
  }
})
