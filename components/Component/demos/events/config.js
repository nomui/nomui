define([], function () {
  return {
    title: 'onConfig: 生命周期-组件配置事件',
    file: 'config',
    description:
      '通过 `onConfig` 配置函数配置组件的属性（props）。组件初次渲染和后续更新都会执行该函数代码。',
    demo: function () {
      let bookInfoRef = null
      const books = [
        { name: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
        { name: '雪山飞狐', publisher: '三联出版社', publication_year: '1980' },
        { name: '连城诀', publisher: '三联出版社', publication_year: '1980' },
        { name: '天龙八部', publisher: '三联出版社', publication_year: '1980' },
        { name: '射雕英雄传', publisher: '三联出版社', publication_year: '1980' },
      ]
      return {
        component: 'Flex',
        rows: [
          {
            component: 'RadioList',
            label: '你最喜欢看的小说',
            options: books.map((book) => {
              return { text: book.name, value: book.name }
            }),
            onValueChange: ({ newValue }) => {
              const currentBook = books.find((book) => {
                return book.name === newValue
              })

              bookInfoRef.update({
                currentBook: currentBook,
              })
            },
          },
          {
            tag: 'p',
            ref: (c) => {
              bookInfoRef = c
            },
            currentBook: null,
            autoRender: false,
            onConfig: ({ inst, props }) => {
              const { currentBook } = props
              if (currentBook !== null) {
                inst.setProps({
                  children: {
                    component: 'Flex',
                    gap: 'small',
                    rows: [
                      {
                        tag: 'img',
                        attrs: {
                          src: `/docs/images/books/${currentBook.name}.jpg`,
                        },
                      },
                      { children: currentBook.name },
                      {
                        children: {
                          styles: {
                            text: 'muted',
                          },
                          children: `${currentBook.publisher} / ${currentBook.publication_year}`,
                        },
                      },
                    ],
                  },
                })
              }
            },
          },
        ],
      }
    },
  }
})
