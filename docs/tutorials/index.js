define([], function () {
  return function () {
    let articleMenu = null,
      content = null

    const renderArticle = () => {
      const article = this.$route.query.article || 'getstarted'
      const articleUrl = `text!/docs/tutorials/${article}.md`
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
              {
                text: '快速开始',
                items: [
                  { text: '起步', id: 'getstarted', url: '#!tutorials/index?article=getstarted' },
                  { text: '组件', id: 'component', url: '#!tutorials/index?article=component' },
                  { text: '事件', id: 'event', url: '#!tutorials/index?article=event' },
                ],
              },
              {
                text: '单页应用',
                items: [
                  { text: '路由对象', id: 'route', url: '#!tutorials/index?article=route' },
                  { text: '应用组件', id: 'app', url: '#!tutorials/index?article=app' },
                  { text: '视图', id: 'view', url: '#!tutorials/index?article=view' },
                  { text: '事件总线', id: 'event-bus', url: '#!tutorials/index?article=event-bus' },
                ],
              },
              {
                text: '业务',
                items: [
                  {
                    text: '权限',
                    id: 'bus-authority',
                    url: '#!tutorials/index?article=bus-authority',
                  },
                  { text: 'ajax', id: 'bus-ajax', url: '#!tutorials/index?article=bus-ajax' },
                  { text: 'utils', id: 'bus-utils', url: '#!tutorials/index?article=bus-utils' },
                ],
              },
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
