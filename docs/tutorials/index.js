define([], function () {

    return {
        component: 'Layout',
        sider: {
            children: {
                component: 'Menu',
                ref: 'articleMenu',
                items: [
                    {
                        text: '快速开始',
                        items: [
                            { text: '起步', id: 'getstarted', url: '#!tutorials/index?article=getstarted' },
                            { text: '组件', id: 'component', url: '#!tutorials/index?article=component' },
                        ]
                    },
                    {
                        text: '单页应用',
                        items: [
                            { text: '路由对象', id: 'route', url: '#!tutorials/index?article=route' },
                            { text: '应用组件', id: 'app', url: '#!tutorials/index?article=app' },
                            { text: '视图', id: 'view', url: '#!tutorials/index?article=view' },
                        ]
                    },
                ],
                itemDefaults: {
                    key: function () {
                        return this.props.id
                    },
                    styles: {
                        hover: {
                            color: 'darken'
                        },
                        selected: {
                            color: 'darken'
                        }
                    },
                }
            },
            styles: {
                color: 'lprimary'
            }
        },
        body: {
            children: {
                ref: 'content'
            },
            styles:
            {
                padding: '1'
            }
        },
        _render: function () {
            this.renderArticle();
        },
        events: {
            queryChange: function () {
                this.renderArticle();
            }
        },
        methods: {
            renderArticle: function () {
                let article = this.route.query.article || 'getstarted'
                var articleUrl = 'text!/docs/tutorials/' + article + '.md';
                this.refs.articleMenu.selectItem(article);
                this.refs.articleMenu.expandToItem(article);

                require([articleUrl], (articleContent) => {
                    this.refs.content.update({ children: marked(articleContent) })
                })
            }
        }
    }
})