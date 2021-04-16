define([], function () {
    return {
        title: '幽灵按钮',
        file: 'ghost',
        demo: function () {
            return {
                component: 'Cols',
                styles: {
                    color: 'primary',
                    padding: '1'
                },
                items: [
                    {
                        component: 'Button',
                        text: 'primary',
                        type: 'primary',
                        ghost: true,
                    },
                    {
                        component: 'Button',
                        text: 'default',
                        type: 'default',
                        ghost: true,
                    },
                    {
                        component: 'Button',
                        text: 'dashed',
                        type: 'dashed',
                        ghost: true,
                    },
                    {
                        component: 'Button',
                        text: 'text',
                        type: 'text',
                        ghost: true,
                    },
                    {
                        component: 'Button',
                        text: 'link',
                        type: 'link',
                        ghost: true,
                    },
                ],
            }
        },
    }
})
