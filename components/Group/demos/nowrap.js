define([], function () {
    return {
        title: '不换行',
        file: 'nowrap',
        demo: function () {
            return {
                component: 'Group',
                nowrap: true,
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
