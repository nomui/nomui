define([], function () {
    return {
        component: 'Layout',
        header: {
            styles: {
                color: 'primary'
            },
            children:
            {
                component: 'Navbar',
                caption: {
                    title: 'NomUI',
                    href: '/',
                },
                nav: {
                    component: 'Menu',
                    ref: 'topMenu',
                    styles: {
                        padding: 'l-2',
                    },
                    items: [
                        { text: '教程', id: 'tutorials/index', url: '#!tutorials/index' },
                        { text: '组件', id: 'components', url: '#!components!' }
                    ],
                    type: 'horizontal',
                    itemDefaults: {
                        key: function () {
                            return this.props.id
                        },
                        styles: {
                            hover: {
                                color: 'lighten'
                            },
                            selected: {
                                color: 'lighten'
                            }
                        }
                    }
                },
                tools: [
                    'github',
                    'github',
                ],
            }
        },
        body: {
            children: {
                component: 'View',
                defaultPath: 'home'
            }
        },
        _render: function () {
            this.highLight();
        },
        events: {
            subpathChange: function () {
                this.highLight();
            }
        },
        methods: {
            highLight: function () {
                this.refs.topMenu.selectItem(this.$route.paths[this.viewLevel + 1]);
                this.refs.topMenu.expandToItem(this.$route.paths[this.viewLevel + 1]);
            }
        }
    }
});