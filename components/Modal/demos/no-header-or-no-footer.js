define([], function () {
    return {
        title: '没有头部/底部',
        file: 'no-header-or-no-footer',
        description:
            '通过配置 content 的 `header` 和 `footer` 为 `false` 来控制不显示头部和底部。当需要完全自定义头部或底部时可以设置这两个属性。',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Button',
                        name: 'button',
                        text: '点我',
                        onClick: function () {
                            new nomui.Modal({
                                noHeader: true,
                                noFooter: true,
                                content: {
                                    component: 'Panel',
                                    header: false,
                                    footer: false,
                                    body: {
                                        children: [
                                            {
                                                children: 'I am a modal',
                                            },
                                        ],
                                    },
                                },
                            })
                        },
                    },
                ],
            }
        },
    }
})
