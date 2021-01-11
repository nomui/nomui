define([], function () {

    return function () {
        let topMenu = null

        const highLight = () => {
            topMenu && topMenu.selectItem(this.$route.paths[this.level + 1]);
            topMenu && topMenu.expandToItem(this.$route.paths[this.level + 1]);
        }

        return {
            view: () => {
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
                            component: 'View',
                            defaultPath: 'home'
                        }
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