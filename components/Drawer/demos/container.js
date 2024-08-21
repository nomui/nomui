define([], function () {
    return {
        title: '指定父容器',
        file: 'container',
        description:
            '通过getContainer指定抽屉的父容器',
        demo: function () {
            return {
                attrs: {
                    id: 'drawerContainer',
                    style: {
                        height: '500px',
                        background: '#f0f0f0'
                    }
                },
                children: [{
                    component: 'Button',
                    name: 'button',
                    text: '点我打开抽屉',
                    onClick: () => {
                        new nomui.Drawer({
                            getContainer: document.querySelector('#drawerContainer'),
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
                ]
            }
        },
    }
})
