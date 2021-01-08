define([], function () {

    return {
        title: '内联布局',
        file: 'inline',
        demo: function () {
            return {
                component: 'Form',
                inline: true,
                fields: [
                    {
                        name: 'userName',
                        label: '用户名',
                        control: {
                            component: 'Textbox',
                        },
                    },
                    {
                        name: 'password',
                        label: '密码',
                        control: {
                            component: 'Textbox',
                        },
                    },
                    {
                        name: 'action',
                        control: {
                            component: 'Button',
                            text: '登录'
                        },
                    }
                ]
            }
        }
    }

})