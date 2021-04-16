define([], function () {
    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Navbar',
                caption: { title: '标题' },
                nav: {
                    component: 'Menu',
                    direction: 'horizontal',
                    items: [
                        { text: '菜单一' },
                        { text: '菜单二' },
                    ]
                },
                tools: [
                    { component: 'Button', text: '工具按钮' }
                ]
            }
        },
    }
})
