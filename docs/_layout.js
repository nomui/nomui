define([], function () {
    return {
        component: 'Layout',
        header: {
            children:
            {
                component: 'Navbar',
                title: {
                    heading: { text: 'NomUI' },
                    href: '/'
                },
                body: {
                    styles: {
                        padding: 'l-2',
                    },
                    children: {
                        component: 'Menu',
                        ref: 'topMenu',
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
                                    bg: 'lighten'
                                },
                                selected: {
                                    bg: 'lighten'
                                }
                            }
                        }
                    },
                },
                styles: {
                    bg: 'primary'
                }
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
                this.refs.topMenu.selectItem(this.route.paths[this.viewLevel + 1]);
                this.refs.topMenu.expandToItem(this.route.paths[this.viewLevel + 1]);
            }
        }
    }
});