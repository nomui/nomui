define([], function () {
    return {
        title: '配置内容适应屏幕高度',
        file: 'content',
        demo: function () {
            return {
                component: 'Flex',
                gap: 'small',
                cols: [
                    {
                        component: 'Button',
                        text: '点击弹出',
                        popup: {
                            // 当用content代替chilren时，内容会在一个屏幕高度范围内自适应
                            content: {
                                component: 'Layout',
                                body: {
                                    children: {
                                        attrs: {
                                            style: {
                                                height: '300px',
                                                width: '400px'
                                            }
                                        },
                                        children: 'inner'
                                    }
                                },
                                footer: {
                                    styles: {
                                        padding: '1'
                                    },
                                    children: {
                                        component: 'Flex',
                                        align: 'center',
                                        justify: 'end',
                                        fit: true,
                                        cols: [
                                            {
                                                component: 'Button',
                                                text: '按钮'
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },

                ],
            }
        },
    }
})
