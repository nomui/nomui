define([], function () {
    return {
        title: '投影层与外部关闭',
        file: 'backdrop',
        description:
            '某些场景可以配置没有投影层，并且可以点击外部关闭。',
        demo: function () {


            return {
                children: {
                    component: 'Flex',
                    gutter: 'small',
                    cols: [{
                        component: 'Button',
                        name: 'button',
                        text: '点击外部关闭',
                        onClick: () => {
                            new nomui.Drawer({
                                closeOnClickOutside: true,
                                showBackdrop: false,
                                content: {
                                    header: {
                                        caption: {
                                            title: 'hello',
                                        },
                                    },
                                    body: {
                                        children: [
                                            {
                                                component: 'Select',
                                                options: [
                                                    {
                                                        text: '金庸',
                                                        value: 0,
                                                    },
                                                    {
                                                        text: '古龙',
                                                        value: 1,
                                                    },
                                                    {
                                                        text: '梁羽生',
                                                        value: 2,
                                                    },
                                                    {
                                                        text: '温瑞安',
                                                        value: 3,
                                                    },
                                                    {
                                                        text: '金庸',
                                                        value: 4,
                                                    },
                                                    {
                                                        text: '古龙',
                                                        value: 5,
                                                    },
                                                    {
                                                        text: '梁羽生',
                                                        value: 6,
                                                    },
                                                    {
                                                        text: '温瑞安',
                                                        value: 7,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                                onOk: ({ sender }) => {
                                    new nomui.Message({ type: 'info', content: '点击了确定按钮' })
                                    sender.close()
                                },
                            })
                        },
                    },
                    {
                        component: 'Button',
                        name: 'button',
                        text: '点击投影层关闭',
                        onClick: () => {
                            new nomui.Drawer({
                                closeOnClickBackdrop: true,
                                content: {
                                    header: {
                                        caption: {
                                            title: 'hello',
                                        },
                                    },
                                    body: {
                                        children: [
                                            {
                                                component: 'Select',
                                                options: [
                                                    {
                                                        text: '金庸',
                                                        value: 0,
                                                    },
                                                    {
                                                        text: '古龙',
                                                        value: 1,
                                                    },
                                                    {
                                                        text: '梁羽生',
                                                        value: 2,
                                                    },
                                                    {
                                                        text: '温瑞安',
                                                        value: 3,
                                                    },
                                                    {
                                                        text: '金庸',
                                                        value: 4,
                                                    },
                                                    {
                                                        text: '古龙',
                                                        value: 5,
                                                    },
                                                    {
                                                        text: '梁羽生',
                                                        value: 6,
                                                    },
                                                    {
                                                        text: '温瑞安',
                                                        value: 7,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                                onOk: ({ sender }) => {
                                    new nomui.Message({ type: 'info', content: '点击了确定按钮' })
                                    sender.close()
                                },
                            })
                        },
                    },],
                }
            }
        },
    }
})
