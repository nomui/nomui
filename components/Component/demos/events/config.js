define([], function () {
  return {
    title: 'onConfig',
    file: 'config',
    description:
      '通过 `onConfig` 回调函数配置组件的属性（props）。组件初次渲染和后续更新都会执行该函数代码。',
    demo: function () {
      let favoriteBook = null

      let bookInfoRef = null

      const books = [
        { name: '连城诀', publisher: '三联出版社', publication_year: '1980' },
        { name: '雪山飞狐', publisher: '三联出版社', publication_year: '1980' },
        { name: '天龙八部', publisher: '三联出版社', publication_year: '1980' },
      ]

      const findBook = (bookName) => {
        return books.find((book) => {
          return book.name === bookName
        })
      }

      return {
        component: 'Flex',
        rows: [
          {
            children: {
              component: 'Flex',
              rows: [
                {
                  component: 'RadioList',
                  label: '最喜欢看的小说',
                  uistyle: 'button',
                  options: books.map((book) => {
                    return { text: book.name, value: book.name }
                  }),
                  onValueChange: ({ newValue }) => {
                    favoriteBook = findBook(newValue)

                    bookInfoRef.update()
                  },
                },
                {
                  tag: 'p',
                  ref: (c) => {
                    bookInfoRef = c
                  },
                  onConfig: ({ inst }) => {
                    if (favoriteBook !== null) {
                      inst.setProps({
                        children: {
                          component: 'Flex',
                          gap: 'small',
                          rows: [
                            {
                              tag: 'img',
                              attrs: {
                                src: `docs/images/books/${favoriteBook.name}.jpg`,
                              },
                            },
                            { children: favoriteBook.name },
                            {
                              children: {
                                styles: {
                                  text: 'muted',
                                },
                                children: `${favoriteBook.publisher} / ${favoriteBook.publication_year}`,
                              },
                            },
                          ],
                        },
                      })
                    } else {
                      inst.setProps({
                        children: '请选择你最喜欢的一本小说',
                      })
                    }
                  },
                },
              ],
            },
          },
        ],
      }
    },
  }
})
