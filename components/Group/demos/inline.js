define([], function () {
    return {
        title: '内联布局',
        file: 'inline',
        demo: function () {
            return {
                component: 'Group',
                inline: true,
                fields: [
                    {
                        component: 'Textbox', name: 'userName', label: '用户名',
                    },
                    {
                        component: 'Textbox', name: 'password', label: '密码',
                    },
                    {
                        name: 'action',
                        control: {
                            component: 'Button',
                            text: '登录',
                        },
                    },
                ],
            }
        },
    }
})
