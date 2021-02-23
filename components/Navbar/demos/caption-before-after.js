define([], function () {
    return {
        title: '标题前后自定义',
        file: 'basic',
        demo: function () {
            return {
                component: 'Navbar',
                captionBefore: [{
                    component: 'Button',
                    type: 'link',
                    text: '返回',
                    icon: 'left'
                }],
                caption: { title: '标题' },
                captionAfter: [{
                    component: 'Tag',
                    text: '测试环境',
                    color: 'olive',
                }],
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
