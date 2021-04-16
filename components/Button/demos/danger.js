define([], function () {
    return {
        title: '危险按钮',
        file: 'danger',
        description: '删除/移动/修改权限等危险操作，一般需要二次确认。',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        component: 'Button',
                        text: 'primary',
                        type: 'primary',
                        danger: true,
                    },
                    {
                        component: 'Button',
                        text: 'default',
                        danger: true,
                    },
                    {
                        component: 'Button',
                        text: 'dashed',
                        type: 'dashed',
                        danger: true,
                    },
                    {
                        component: 'Button',
                        text: 'text',
                        type: 'text',
                        danger: true,
                    },
                    {
                        component: 'Button',
                        text: 'link',
                        type: 'link',
                        danger: true,
                    },
                    {
                        component: 'Button',
                        icon: 'close',
                        danger: true,
                    },
                ],
            }
        },
    }
})
