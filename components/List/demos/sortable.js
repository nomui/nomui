define([], function () {
  let listRef
  return {
    title: '可拖拽排序',
    file: 'sortable',
    // description:'ListItem可以拖拽排序',
    demo: function () {
      const books = [
        { key: 1, name: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
        { key: 2, name: '雪山飞狐', publisher: '三联出版社', publication_year: '1980' },
        { key: 3, name: '连城诀', publisher: '三联出版社', publication_year: '1980' },
        { key: 4, name: '天龙八部', publisher: '三联出版社', publication_year: '1999' },
        { key: 5, name: '射雕英雄传', publisher: '三联出版社', publication_year: '1999' },
      ]
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
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
          {
            component: 'Divider',
          },
          {
            children: {
              component: 'List',
              wrap: true,
              sortable: {
                // draggableName: '.u-text-muted',
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
                      classes: { 'item-image': true },
                      attrs: {
                        src: `docs/images/books/${itemData.name}.jpg`,
                      },
                    },
                    { children: itemData.name, classes: { 'item-name': true } },
                    {
                      children: {
                        styles: { text: 'muted' },
                        classes: { '.item-info': true },
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
            text: '设置第《连城诀》为不可拖拽',
            onClick: () => {
              listRef.update({
                sortable: {
                  disabledDragKeys: [3],
                },
              })
            },
          },
          {
            component: 'RadioList',
            uistyle: 'button',
            options: [
              {
                text: 'handleClassName 设为',
                value: 0,
                disabled: true,
              },
              {
                text: '图片 .item-image',
                value: '.item-image',
              },
              {
                text: '书名 .item-name',
                value: '.item-name',
              },
              {
                text: '出版信息 .item-info',
                value: '.item-info',
              },
              {
                text: '默认',
                value: null,
              },
            ],
            onValueChange: ({ newValue }) => {
              listRef.update({
                sortable: {
                  handleClassName: newValue,
                },
              })
            },
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: '获取上一次拖拽的item数据',
                onClick: () => {
                  console.log(listRef.getLastDragItem())
                },
              },
              {
                component: 'Button',
                text: 'getAllItems',
                onClick: () => {
                  console.log(listRef.getAllItems())
                },
              },
            ],
          },
        ],
      }
    },
  }
})
