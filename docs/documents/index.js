define([], function () {
  return function () {
    let articleMenu = null,
      content = null

    const renderArticle = () => {
      const article = this.$route.query.article || 'CHANGELOG'
      const articleUrl = `text!/${article}.md`
      articleMenu.selectItem(article)
      articleMenu.expandToItem(article)

      require([articleUrl], (articleContent) => {
        content.update({ children: `#${marked(articleContent)}` })
      })
    }

    return {
      view: {
        component: 'Layout',
        sider: {
          children: {
            component: 'Menu',
            ref: (c) => {
              articleMenu = c
            },
            items: [
              { text: '版本更新日志', id: 'changelog', url: '#!documents/index?article=CHANGELOG' },
              { text: 'Git提交规范', id: 'commitmsg', url: '#!documents/index?article=commitlint' },
              { text: '版本发布流程', id: 'commitmsg', url: '#!documents/index?article=release' },
            ],
            itemDefaults: {
              key: function () {
                return this.props.id
              },
              styles: {
                hover: {
                  color: 'darken',
                },
                selected: {
                  color: 'darken',
                },
              },
            },
          },
          styles: {
            color: 'lprimary',
          },
        },
        body: {
          children: {
            attrs: {
              id: 'nice',
            },
            ref: (c) => {
              content = c
            },
          },
          styles: {
            padding: '1',
          },
        },
      },
      _rendered: function () {
        renderArticle()
      },
      onQueryChange: () => {
        renderArticle()
      },
    }
  }
})
