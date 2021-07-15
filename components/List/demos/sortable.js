define([], function () {
  let listRef
  return {
    title: '可拖拽排序',
    file: 'sortable',
    // description:'ListItem可以拖拽排序',
    demo: function () {
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
              component: 'List',
              wrap: true,
              sortable: {
                onEnd: () => {
                  console.log('处理拖拽end事件', listRef.getLastDragItem())
                },
              },
              ref: (c) => {
                listRef = c
              },
              gutter: 'md',
              data: books,
              itemRender: ({ itemData }) => {
                return {
                  component: 'Flex',
                  gap: 'small',
                  rows: [
                    {
                      tag: 'img',
                      attrs: {
                        src: `/docs/images/books/${itemData.name}.jpg`,
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
                  ],
                }
              },
            },
          },
          {
            component: 'Button',
            text: '获取上一次拖拽的item数据',
            onClick: () => {
              console.log(listRef.getLastDragItem())
            },
          },
          {
            component: 'Divider',
          },
          {
            component: 'List',
            gutter: 'md',
            sortable: true,
            items: [
              { text: '飞狐外传', key: 1 },
              { text: '雪山飞狐', key: 2 },
              { text: '连城诀', key: 3 },
              { text: '天龙八部', key: 4 },
              { text: '射雕英雄传', key: 5 },
              { text: '白马啸西风', key: 6 },
              { text: '鹿鼎记', key: 7 },
            ],
            itemDefaults: {
              _config: function () {
                this.setProps({
                  children: this.props.text,
                })
              },
            },
            disabledItems: [1, 3],
          },
        ],
      }
    },
  }
})
