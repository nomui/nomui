define([], function () {

    return function () {
        let topMenu = null

        const highLight = () => {
            topMenu && topMenu.selectItem(this.subpath);
            topMenu && topMenu.expandToItem(this.subpath);
        }

        return {
            view: {
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
                            ref: (c) => {
                                topMenu = c
                            },
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
                            {
                                component: 'Button',
                                icon: 'github',
                                href: 'https://github.com/nomui/nomui',
                                styles: {
                                    color: 'transparent'
                                }
                            }
                        ],
                    }
                },
                body: {
                    children: {
                        component: 'Router',
                        defaultPath: 'home'
                    }
                }
            },
            _rendered: function () {
                highLight();
            },
            onSubpathChange: () => {
                highLight();
            }
        }
    }

});