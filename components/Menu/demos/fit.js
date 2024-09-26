define([], function () {
    return {
        title: '自适应高度',
        file: 'fit',
        demo: function () {
            return {
                component: 'Layout',
                header: {
                    children: {
                        component: 'Navbar',
                        fit: true,
                        caption: {
                            title: '标题'
                        },
                        nav: {
                            component: 'Menu',
                            direction: 'horizontal',
                            itemSelectable: {
                                byClick: true
                            },
                            fit: true,
                            uistyle: 'line',
                            items: [
                                { text: '菜单一', id: '1', },
                                { text: '菜单二', id: '2', },
                                { text: '菜单三', id: '3', },
                                { text: '菜单四', id: '4', },
                                { text: '菜单五', id: '5', },
                            ],
                        },
                    }
                }
            }
        },
    }
})
