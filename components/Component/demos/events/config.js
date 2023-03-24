define([], function () {
  return {
    title: 'onConfig',
    file: 'config',
    description:
      '通过 `onConfig` 回调函数配置组件的属性（props）。组件初次渲染和后续更新都会执行该函数代码。',
    demo: function () {
      let favoriteBook = null

      let bookInfoRef = null,
        bookInfo2Ref = null

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
        cols: [
          {
            span: 6,
            children: {
              component: 'Panel',
              uistyle: 'bordered',
              header: {
                caption: { title: '配置数据（状态）挂在组件自身的 props 上' },
              },
              body: {
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
                      currentBook: null, // 自定义组件 prop，注意不要与组件已有 props 重复
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
                                    src: `docs/images/books/${currentBook.name}.jpg`,
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
            },
          },
          {
            span: 6,
            children: {
              component: 'Panel',
              uistyle: 'bordered',
              header: {
                caption: { title: '配置数据（状态）定义在上下文中' },
              },
              body: {
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

                        bookInfo2Ref.update()
                      },
                    },
                    {
                      tag: 'p',
                      ref: (c) => {
                        bookInfo2Ref = c
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
            },
          },
        ],
      }
    },
  }
})
